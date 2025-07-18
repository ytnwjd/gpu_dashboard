import React, {useEffect, useState} from 'react';
import { TableRow } from '@mui/material';
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

const JobListCard = () => {
    const [jobList, setJobList] = useState([]);

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
        { id: "actions", label: "Actions", width: 100 },
        { id: "showLogs", label: "show logs", width: 100 },
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
        console.log(`Edit job with ID: ${jobId}`);
    
        alert(`${jobId}번 작업 수정`);
    };

    const handleDeleteJob = (jobId) => {
        console.log(`Delete job with ID: ${jobId}`);
        
        alert(`${jobId}번 작업 삭제`);
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
                                        <StyledBodyTableCell>
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
                                        </StyledBodyTableCell>
                                        <StyledBodyTableCell>
                                            {job.id === latestJobId && (
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
        </StyledCard>
    );
}

export default JobListCard;