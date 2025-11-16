import React, { useState, useCallback, useMemo } from 'react';
import { TableRow, TableContainer, Table, TableHead, TableCell, TableBody, Typography } from '@mui/material';
import CustomCard from './CustomCard';
import './Card.css';
import { useUser } from '../../contexts/UserContext';

import LogViewerDrawer from "../Modal/LogViewerDrawer";
import EditJobFormModal from "../Modal/EditJobFormModal";
import JobDetailModal from '../Modal/JobDetailModal';

const JobListCard = ({ jobList }) => {
    const {user_id} = useUser();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [jobToEdit, setJobToEdit] = useState(null);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedJobDetail, setSelectedJobDetail] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [currentJobLogs, setCurrentJobLogs] = useState([]);
    const [currentJobName, setCurrentJobName] = useState('');

    const headers = [
        { id: "requested_at", label: "Job 요청 시간", width: 140 },
        { id: "jobName", label: "Job 이름", width: 'auto' },
        { id: "status", label: "Status", width: 80 },
        { id: "actions", label: "Actions", width: 120 },
    ];

    const jobListData = useMemo(() => jobList || [], [jobList]);

    const formatTimestamp = useCallback((timestamp) => {
        if (!timestamp) return '-';
        
        try {
            const date = new Date(timestamp);
            if (isNaN(date.getTime())) return '-';
            
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            
            return `${year}-${month}-${day} ${hours}:${minutes}`;
        } catch (error) {
            console.error('Timestamp 포맷팅 오류:', error);
            return '-';
        }
    }, []);

    const getStatusColor = useCallback((status) => {
        const colorMap = {
            'pending': '#cf9a15',
            'running': '#1708bd',
            'completed': '#83A000', 
            'failed': '#d10a0a'
        };
        return colorMap[status] || '#000000';
    }, []);

    const handleShowLogsClick = useCallback(async (jobId) => {
        try {
            const response = await fetch(`/user/${user_id}/jobs?job_id=${jobId}&log=true`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const responseData = await response.json();
            if (responseData.code === 200 && responseData.log_content) {
                // 로그 내용을 줄별로 분리
                const logLines = responseData.log_content.split('\n').filter(line => line.trim() !== '');
                setCurrentJobLogs(logLines);
                setCurrentJobName(`Job ${jobId} - ${responseData.file_name}`);
                setDrawerOpen(true);
            } else {
                alert(`로그 파일을 불러올 수 없습니다: ${responseData.message}`);
            }
        } catch (error) {
            alert(`로그 파일 불러오기 중 오류 발생: ${error.message}`);
        }
    }, [jobListData, user_id]);

    const handleDrawerClose = useCallback(() => {
        setDrawerOpen(false);
        setCurrentJobLogs([]);
        setCurrentJobName('');
    }, []);

    const handleEditJob = useCallback((jobId) => {
        const job = jobListData.find(j => (j._id || j.id) === jobId);
        if (job) {
            setJobToEdit(job);
            setEditModalOpen(true);
        }
    }, [jobListData]);

    const handleEditModalClose = useCallback(() => {
        setEditModalOpen(false);
        setJobToEdit(null);
    }, []);

    const handleEditFormSubmit = useCallback(async (formData) => {
        if (!jobToEdit) return;
        try {
            const response = await fetch(`/user/${user_id}/jobs?job_id=${jobToEdit._id || jobToEdit.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const responseData = await response.json();
            if (response.ok && responseData.code === 200) {
                alert(`작업 ID: ${jobToEdit._id || jobToEdit.id} 수정에 성공했습니다.`);
                handleEditModalClose();
            } else {
                alert(`작업 수정 실패: ${responseData.message || '알 수 없는 오류'}`);
            }
        } catch (error) {
            alert(`작업 수정 중 오류 발생: ${error.message}`);
        }
    }, [jobToEdit, handleEditModalClose, user_id]);

    const handleDeleteJob = useCallback(async (jobId) => {
        if (!window.confirm(`작업을 삭제하시겠습니까?`)) return;
        
        try {
            const response = await fetch(`/user/${user_id}/jobs?job_id=${jobId}`, { method: 'DELETE' });
            const result = await response.json();
            if (response.ok && result.code === 200) {
                alert(result.message);
            } else {
                alert(result.message || `Job 삭제에 실패했습니다.`);
            }
        } catch (error) {
            alert(`Job 삭제 중 오류가 발생했습니다.`);
        }
    }, [user_id]);

    const handleRowClick = useCallback(async (jobId) => {
        const job = jobListData.find(j => (j._id || j.id) === jobId);
        // running 상태인 경우 log=true, 그 외는 log=false
        const logParam = job && job.status === 'running' ? 'true' : 'false';
        
        try {
            const response = await fetch(`/user/${user_id}/jobs?job_id=${jobId}&log=${logParam}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const responseData = await response.json();
            if (responseData.code === 200 && responseData.data) {
                const formattedData = {
                    ...responseData.data,
                    requested_at: formatTimestamp(responseData.data.requested_at),
                    started_at: formatTimestamp(responseData.data.started_at),
                    completed_at: formatTimestamp(responseData.data.completed_at)
                };
                setSelectedJobDetail(formattedData);
                setDetailModalOpen(true);
                
                // log=true이고 로그 내용이 있으면 로그도 저장 (show logs 버튼 활성화용)
                if (logParam === 'true' && responseData.log_content) {
                    const logLines = responseData.log_content.split('\n').filter(line => line.trim() !== '');
                    setCurrentJobLogs(logLines);
                    setCurrentJobName(`Job ${jobId} - ${responseData.file_name || 'logs'}`);
                }
            } else {
                alert(`Job 상세 정보 불러오기에 실패했습니다: ${responseData.message || '알 수 없는 오류'}`);
            }
        } catch (error) {
            alert(`Job 상세 정보 불러오기 중 오류 발생: ${error.message}`);
        }
    }, [formatTimestamp, jobListData, user_id]);

    const handleDetailModalClose = useCallback(() => {
        setDetailModalOpen(false);
        setSelectedJobDetail(null);
    }, []);

    const cardContent = (
        <TableContainer className="job-list-table-container">
            <Table className="job-list-table" stickyHeader aria-label="job list table">
                <TableHead>
                    <TableRow sx={{ height: '25px', '& th': { height: '25px' } }}>
                        {headers.map((header) => (
                            <TableCell
                                key={header.id}
                                className="job-list-header-cell"
                                variant="head"
                                sx={{ 
                                    width: header.width === 'auto' ? 'auto' : header.width,
                                    flex: header.width === 'auto' ? 1 : 'none'
                                }}
                            >
                                {header.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jobListData.length === 0 ? (
                        <TableRow>
                            <TableCell className="job-list-message-cell" colSpan={headers.length}>
                                <Typography variant="body1">
                                    등록된 Job이 없습니다.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        jobListData.map((job) => (
                            <TableRow
                                key={job._id || job.id}
                                onClick={() => handleRowClick(job._id || job.id)}
                                sx={{ 
                                    cursor: 'pointer', 
                                    '&:hover': { backgroundColor: 'action.hover' },
                                    height: '25px',
                                    '& td': { height: '25px' }
                                }}
                            >
                                <TableCell className="job-list-body-cell">
                                    {formatTimestamp(job.requested_at)}
                                </TableCell>
                                <TableCell 
                                    className="job-list-body-cell"
                                    sx={{ 
                                        textAlign: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    {job.jobName}
                                </TableCell>
                                <TableCell 
                                    className="job-list-body-cell"
                                    sx={{ 
                                        textAlign: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <span style={{ 
                                        color: getStatusColor(job.status),
                                        fontWeight: 'bold'
                                    }}>
                                        {job.status}
                                    </span>
                                </TableCell>
                                <TableCell 
                                    className="job-list-body-cell"
                                    sx={{ 
                                        display: 'flex', 
                                        gap: '8px', 
                                        justifyContent: 'center', 
                                        alignItems: 'center',
                                        height: '100%',
                                        minHeight: '25px',
                                        textAlign: 'center'
                                    }}
                                    onClick={(e) => e.stopPropagation()} 
                                >
                                    {job.status === "pending" && (
                                        <Typography
                                            className="job-list-text-button"
                                            variant="body2"
                                            onClick={() => handleEditJob(job._id || job.id)}
                                            sx={{ whiteSpace: 'nowrap' }}
                                        >
                                            수정
                                        </Typography>
                                    )}
                                    {(job.status === "completed" || job.status === "failed") && (
                                        <Typography
                                            className="job-list-text-button"
                                            variant="body2"
                                            onClick={() => handleDeleteJob(job._id || job.id)}
                                            sx={{ color: 'red', whiteSpace: 'nowrap' }}
                                        >
                                            삭제
                                        </Typography>
                                    )}
                                    {job.status === "running" && (
                                        <Typography
                                            className="job-list-text-button"
                                            variant="body2"
                                            onClick={() => handleShowLogsClick(job._id || job.id)}
                                        >
                                            show logs
                                        </Typography>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <>
            <CustomCard
                title="GPU Job 실행 리스트"
                content={cardContent}
                width='740px'
                height='470px'
            />

            <LogViewerDrawer
                open={drawerOpen}
                onClose={handleDrawerClose}
                jobName={currentJobName}
                logs={currentJobLogs}
            />

            {jobToEdit && (
                <EditJobFormModal
                    open={editModalOpen}
                    onClose={handleEditModalClose}
                    initialData={jobToEdit}
                    onSave={handleEditFormSubmit}
                />
            )}

            <JobDetailModal
                open={detailModalOpen}
                onClose={handleDetailModalClose}
                jobDetail={selectedJobDetail}
            />
        </>
    );
}

export default JobListCard;