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
                const response = await fetch('http://localhost:8000/api/jobs');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setJobList(data);
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            }
        };

        fetchJobs();
    }, []);

    const latestJobId = jobList.length > 0 ? jobList[jobList.length - 1].id : null;

    const headers = [
        { id: "timestamp", label: "Time Stamp", width: 220 },
        { id: "jobName", label: "Job Name", flex: 1 },
        { id: "showLogs", label: "show logs", width: 170 },
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
                                        sx={{ width: header.width || 'auto' }}
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