import React, {useState} from 'react';
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
    const jobList = [
        { id: '1', timestamp: '2025-07-14 10:00:00', jobName: 'My first GPU job' },
        { id: '2', timestamp: '2025-07-14 10:15:30', jobName: 'Deep Learning Model Training'},
        { id: '3', timestamp: '2025-07-15 10:15:30', jobName: 'Deep Learning'},
        { id: '5', timestamp: '2025-07-16 10:15:30', jobName: 'Deep Learning'},
        { id: '6', timestamp: '2025-07-17 10:15:30', jobName: 'Deep Learning'},
        { id: '7', timestamp: '2025-07-18 10:15:30', jobName: 'Deep Learning'},
        { id: '8', timestamp: '2025-07-19 10:15:30', jobName: 'Deep Learning'}
    ];

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