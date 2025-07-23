import React, { useState } from 'react';
import { TableRow, Dialog, DialogContent, DialogTitle, IconButton, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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

const JobListCard = ({ jobList }) => {
  
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
                handleEditModalClose();
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
                    {jobToEdit && (
                        <EditJobFormModal
                            initialData={jobToEdit}
                            onClose={handleEditModalClose}
                            onSave={handleEditFormSubmit}
                        />
                    )}
                </DialogContent>
            </Dialog>

            <Dialog
                open={detailModalOpen}
                onClose={handleDetailModalClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Job 상세 정보
                    <IconButton
                        aria-label="close"
                        onClick={handleDetailModalClose}
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
                    {selectedJobDetail ? (
                        <Box sx={{ p: 2 }}>
                            <Typography variant="body1" gutterBottom>
                                <strong>타임스탬프:</strong> {selectedJobDetail.timestamp}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Job 이름:</strong> {selectedJobDetail.jobName}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>프로젝트 경로:</strong> {selectedJobDetail.projectPath}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Venv 경로:</strong> {selectedJobDetail.venvPath}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>메인 파일:</strong> {selectedJobDetail.mainFile}
                            </Typography>       
                            <Typography variant="body1" gutterBottom>
                                <strong>상태:</strong> {selectedJobDetail.status}
                            </Typography>             
                        </Box>
                    ) : (
                        <Typography>상세 정보를 불러오는 중입니다...</Typography>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

export default JobListCard;