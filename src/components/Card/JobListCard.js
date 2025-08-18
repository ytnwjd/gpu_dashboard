import React, { useState, useEffect, useCallback } from 'react';
import { TableRow } from '@mui/material';
import CustomCard from './CustomCard'; // CustomCard 임포트

import {
    StyledTableContainer,
    StyledTable,
    StyledTableHead,
    StyledHeaderTableCell,
    StyledTableBody,
    StyledMessageTableCell,
    StyledMessageTypography,
    StyledBodyTableCell,
    StyledTextButton,
} from './JobListCard.style';

import LogViewerDrawer from "../Modal/LogViewerDrawer";
import EditJobFormModal from "../Modal/EditJobFormModal";
import JobDetailModal from '../Modal/JobDetailModal';

const JobListCard = ({ jobList: initialJobList, setJobList }) => {
  
    const [jobList, setInternalJobList] = useState(initialJobList || []);
    
    useEffect(() => {
        setInternalJobList(initialJobList);
    }, [initialJobList]);


    const [editModalOpen, setEditModalOpen] = useState(false);
    const [jobToEdit, setJobToEdit] = useState(null);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedJobDetail, setSelectedJobDetail] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [currentJobLogs, setCurrentJobLogs] = useState([]);
    const [currentJobName, setCurrentJobName] = useState('');

    const headers = [
        { id: "timestamp", label: "생성 시간", width: 140 },
        { id: "jobName", label: "Job 이름", flex: 1 },
        { id: "status", label: "Status", width: 80 },
        { id: "actions", label: "Actions", width: 120 },
    ];

    const formatTimestamp = useCallback((timestamp) => {
        if (!timestamp) return '-';
        
        try {
            console.log(timestamp);
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

    const handleShowLogsClick = useCallback((jobId) => {
        const job = jobList.find(j => j.id === jobId);
        if (job) {
            setCurrentJobLogs(job.log ? [job.log] : []);
            setCurrentJobName(job.jobName);
            setDrawerOpen(true);
        }
    }, [jobList]);

    const handleDrawerClose = useCallback(() => {
        setDrawerOpen(false);
        setCurrentJobLogs([]);
        setCurrentJobName('');
    }, []);

    const handleEditJob = useCallback((jobId) => {
        const job = jobList.find(j => j.id === jobId);
        if (job) {
            setJobToEdit(job);
            setEditModalOpen(true);
        }
    }, [jobList]);

    const handleEditModalClose = useCallback(() => {
        setEditModalOpen(false);
        setJobToEdit(null);
    }, []);

    const refreshJobList = useCallback(async () => {
        try {
            const response = await fetch('/api/jobs/');
            if (!response.ok) throw new Error('Failed to fetch job list');
            const data = await response.json();
            if (data.code === 200) {
                setInternalJobList(data.data);
                if (setJobList) { 
                    setJobList(data.data);
                }
            } else {
                console.error("Failed to refresh job list:", data.message);
            }
        } catch (error) {
            console.error("Error refreshing job list:", error);
        }
    }, [setJobList]);

    const handleEditFormSubmit = useCallback(async (formData) => {
        if (!jobToEdit) return;
        try {
            const response = await fetch(`/api/jobs/${jobToEdit.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const responseData = await response.json();
            if (response.ok && responseData.code === 200) {
                alert(`작업 ID: ${jobToEdit.id} 수정에 성공했습니다.`);
                refreshJobList();
                handleEditModalClose();
            } else {
                alert(`작업 수정 실패: ${responseData.message || '알 수 없는 오류'}`);
            }
        } catch (error) {
            alert(`작업 수정 중 오류 발생: ${error.message}`);
        }
    }, [jobToEdit, refreshJobList, handleEditModalClose]);

    const handleDeleteJob = useCallback(async (jobId) => {
        if (!window.confirm(`작업을 삭제하시겠습니까?`)) return;
        
        try {
            const response = await fetch(`/api/jobs/${jobId}`, { method: 'DELETE' });
            const result = await response.json();
            if (response.ok && result.code === 200) {
                alert(result.message);
                refreshJobList();
            } else {
                alert(result.message || `Job 삭제에 실패했습니다.`);
            }
        } catch (error) {
            alert(`Job 삭제 중 오류가 발생했습니다.`);
        }
    }, [refreshJobList]);

    const handleRowClick = useCallback(async (jobId) => {
        try {
            const response = await fetch(`/api/jobs/${jobId}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const responseData = await response.json();
            if (responseData.code === 200 && responseData.data) {
                setSelectedJobDetail(responseData.data);
                setDetailModalOpen(true);
            } else {
                alert(`Job 상세 정보 불러오기에 실패했습니다.`);
            }
        } catch (error) {
            alert(`Job 상세 정보 불러오기 중 오류 발생: ${error.message}`);
        }
    }, []);

    const handleDetailModalClose = useCallback(() => {
        setDetailModalOpen(false);
        setSelectedJobDetail(null);
    }, []);

    const cardContent = (
        <StyledTableContainer>
            <StyledTable stickyHeader aria-label="job list table">
                <StyledTableHead>
                    <TableRow>
                        {headers.map((header) => (
                            <StyledHeaderTableCell
                                key={header.id}
                                sx={{ width: header.width || 'auto', flex: header.flex || 'none' }}
                            >
                                {header.label}
                            </StyledHeaderTableCell>
                        ))}
                    </TableRow>
                </StyledTableHead>
                <StyledTableBody>
                    {jobList.length === 0 ? (
                        <TableRow>
                            <StyledMessageTableCell colSpan={headers.length}>
                                <StyledMessageTypography variant="body1">
                                    등록된 작업이 없습니다.
                                </StyledMessageTypography>
                            </StyledMessageTableCell>
                        </TableRow>
                    ) : (
                        jobList.map((job) => (
                            <TableRow
                                key={job.id}
                                onClick={() => handleRowClick(job.id)}
                                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
                            >
                                <StyledBodyTableCell>
                                    {formatTimestamp(job.timestamp)}
                                </StyledBodyTableCell>
                                <StyledBodyTableCell>
                                    {job.jobName}
                                </StyledBodyTableCell>
                                <StyledBodyTableCell>
                                    <span style={{ 
                                        color: getStatusColor(job.status),
                                        fontWeight: 'bold'
                                    }}>
                                        {job.status}
                                    </span>
                                </StyledBodyTableCell>
                                <StyledBodyTableCell 
                                    sx={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center'}}
                                    onClick={(e) => e.stopPropagation()} 
                                >
                                    {job.status === "pending" && (
                                        <StyledTextButton
                                            variant="body2"
                                            onClick={() => handleEditJob(job.id)}
                                            sx={{ whiteSpace: 'nowrap' }}
                                        >
                                            수정
                                        </StyledTextButton>
                                    )}
                                    {(job.status === "completed" || job.status === "failed") && (
                                        <StyledTextButton
                                            variant="body2"
                                            onClick={() => handleDeleteJob(job.id)}
                                            sx={{ color: 'red', whiteSpace: 'nowrap' }}
                                        >
                                            삭제
                                        </StyledTextButton>
                                    )}
                                    {job.status === "running" && (
                                        <StyledTextButton
                                            variant="body2"
                                            onClick={() => handleShowLogsClick(job.id)}
                                        >
                                            show logs
                                        </StyledTextButton>
                                    )}
                                </StyledBodyTableCell>
                            </TableRow>
                        ))
                    )}
                </StyledTableBody>
            </StyledTable>
        </StyledTableContainer>
    );

    return (
        <>
            <CustomCard
                title="GPU Job 실행 리스트"
                content={cardContent}
                width='740px'
                height='400px'
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