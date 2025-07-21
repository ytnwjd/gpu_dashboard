import React, { useEffect, useState } from 'react';
import { TableRow, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
    StyledCardHeader,
    StyledHeaderContentDivider,
} from './CustomCard.style'

import {
    StyledCard,
    StyledCardContent,
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

const JobListCard = () => {
    const [jobList, setJobList] = useState([]);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [jobToEdit, setJobToEdit] = useState(null); // 수정할 Job의 데이터

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('/api/jobs');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const responseData = await response.json();

                if (responseData.code === 200 && responseData.data) {
                    const jobs = responseData.data;
                    console.log(jobs);
                    setJobList(jobs);
                } else {
                    console.error("API response error:", responseData.message);
                    setJobList([]);
                }
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
                setJobList([]);
            }
        };

        fetchJobs();

        const intervalId = setInterval(fetchJobs, 5000);
        return () => clearInterval(intervalId);
    }, []);

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

    const handleEditFormSubmit = async (formData) => {
        if (!jobToEdit) return;

        console.log(`Submitting edit for job ID: ${jobToEdit.id}`, formData);

        try {
            const response = await fetch(`/api/jobs/${jobToEdit.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();

            if (response.ok && responseData.code === 200) {
                alert(`작업 ID: ${jobToEdit.id} 수정 성공!`);
                handleEditModalClose();

                await fetchJobs();
            } else {
                alert(`작업 수정 실패: ${responseData.message || '알 수 없는 오류'}`);
                console.error("Failed to edit job:", responseData.message);
            }
        } catch (error) {
            alert(`작업 수정 중 오류 발생: ${error.message}`);
            console.error("Error editing job:", error);
        }
    };

    const handleDeleteJob = async (jobId) => { // 함수를 async로 변경
        console.log(`Delete job with ID: ${jobId}`);
    
        try {
            const response = await fetch(`/api/jobs/${jobId}`, { 
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const result = await response.json();
    
            if (response.ok && result.code === 200) {
                alert(result.message);
                await fetchJobs();
            } else {
                const errorMessage = result.message || `Job 삭제에 실패했습니다. (코드: ${result.code})`;
                alert(errorMessage); 
            }
        } catch (error) {
            console.error(`Job ${jobId} 삭제 중 오류 발생:`, error);
            alert(`Job ${jobId} 삭제 중 오류가 발생했습니다.`);
        }
    };

    const fetchJobs = async () => {
        try {
            const response = await fetch('/api/jobs');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData = await response.json();

            if (responseData.code === 200 && responseData.data) {
                const jobs = responseData.data;
                console.log(jobs);
                setJobList(jobs);
            } else {
                console.error("API response error:", responseData.message);
                setJobList([]);
            }
        } catch (error) {
            console.error("Failed to fetch jobs:", error);
            setJobList([]);
        }
    };

    return (
        <StyledCard width='740px' height='400px'>
            <StyledCardHeader title="GPU Job 실행 리스트" />
            <StyledHeaderContentDivider />
            <StyledCardContent>
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
                                    <TableRow key={job.id}>
                                        <StyledBodyTableCell>{job.timestamp}</StyledBodyTableCell>
                                        <StyledBodyTableCell>{job.jobName}</StyledBodyTableCell>
                                        <StyledBodyTableCell>{job.status}</StyledBodyTableCell>
                                        <StyledBodyTableCell sx={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center'}}> 
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
            </StyledCardContent>

            <LogViewerDrawer
                open={drawerOpen}
                onClose={handleDrawerClose}
                jobName={currentJobName}
                logs={currentJobLogs}
            />

            <Dialog
                open={editModalOpen}
                onClose={handleEditModalClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    작업 수정
                    <IconButton
                        aria-label="close"
                        onClick={handleEditModalClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {jobToEdit && ( // jobToEdit이 있을 때만 폼 렌더링
                        <EditJobFormModal
                            initialData={jobToEdit}
                            onClose={handleEditModalClose}
                            onSave={handleEditFormSubmit}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </StyledCard>
    );
}

export default JobListCard;