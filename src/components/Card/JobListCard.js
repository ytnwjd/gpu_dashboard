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

    const latestJobId = jobList.length > 0 ? jobList[0].id : null;

    const headers = [
        { id: "timestamp", label: "Time Stamp", width: 160 },
        { id: "jobName", label: "Job Name", flex: 1 },
        { id: "status", label: "Status", width: 60 },
        { id: "actions", label: "Actions", width: 150 },
    ];

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [currentJobLogs, setCurrentJobLogs] = useState([]);
    const [currentJobName, setCurrentJobName] = useState('');

    const handleShowLogsClick = (jobId) => {
        const job = jobList.find(j => j.id === jobId);
        if (job) {
            setCurrentJobLogs(job.logs || []);
            setCurrentJobName(job.jobName);
            setDrawerOpen(true);
        }
        console.log(`Show logs for job ID: ${jobId}`);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
        setCurrentJobLogs([]);
        setCurrentJobName('');
    };

    const handleEditJob = (jobId) => {
        const job = jobList.find(j => j.id === jobId);
        if (job) {
            setJobToEdit(job); // 수정할 Job 데이터를 상태에 저장
            setEditModalOpen(true);
        }
        console.log(`Edit job with ID: ${jobId}`);
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
        setJobToEdit(null); // 모달 닫을 때 데이터 초기화
    };

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

    const handleEditFormSubmit = async (formData) => {
        if (!jobToEdit) return;
        try {
            const response = await fetch(`/api/jobs/${jobToEdit.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const responseData = await response.json();
            if (response.ok && responseData.code === 200) {
                alert(`작업 ID: ${jobToEdit.id} 수정 성공!`);
                refreshJobList();
                handleEditModalClose(); // 모달 닫기
            } else {
                alert(`작업 수정 실패: ${responseData.message || '알 수 없는 오류'}`);
            }
        } catch (error) {
            alert(`작업 수정 중 오류 발생: ${error.message}`);
        }
    };

    const handleDeleteJob = async (jobId) => {
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
            alert(`Job ${jobId} 삭제 중 오류가 발생했습니다.`);
        }
    };

    const handleRowClick = async (jobId) => {
        try {
            const response = await fetch(`/api/jobs/${jobId}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const responseData = await response.json();
            if (responseData.code === 200 && responseData.data) {
                setSelectedJobDetail(responseData.data);
                setDetailModalOpen(true);
            } else {
                alert(`Job 상세 정보 불러오기 실패: ${responseData.message || '알 수 없는 오류'}`);
            }
        } catch (error) {
            alert(`Job 상세 정보 불러오기 중 오류 발생: ${error.message}`);
        }
    };

    const handleDetailModalClose = () => {
        setDetailModalOpen(false);
        setSelectedJobDetail(null);
    };

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
                                    GPU 사용 정보가 없습니다.
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
                                <StyledBodyTableCell>{job.timestamp}</StyledBodyTableCell>
                                <StyledBodyTableCell>{job.jobName}</StyledBodyTableCell>
                                <StyledBodyTableCell>{job.status}</StyledBodyTableCell>                                    
                                <StyledBodyTableCell sx={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center'}}
                                    onClick={(e) => e.stopPropagation()} 
                                >
                                    {job.status === "대기" && (
                                        <StyledTextButton
                                            variant="body2"
                                            onClick={() => handleEditJob(job.id)}
                                            sx={{ whiteSpace: 'nowrap' }}
                                        >
                                            작업 수정
                                        </StyledTextButton>
                                    )}
                                    {(job.status === "종료" || job.status === "중단") && (
                                        <StyledTextButton
                                            variant="body2"
                                            onClick={() => handleDeleteJob(job.id)}
                                            sx={{ color: 'red', whiteSpace: 'nowrap' }}
                                        >
                                            작업 삭제
                                        </StyledTextButton>
                                    )}
                                    {((job.id === latestJobId || job.status === "실행 중") && job.status !== "대기") && (
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