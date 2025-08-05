import { styled } from '@mui/system';

export const StyledList = styled('ul')({
  listStyleType: 'none',
  padding: 0,
});

export const StyledFileItem = styled('li')({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 14px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
});

export const StyledFolderItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 14px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
});

export const StyledFileIcon = styled('span')({
  marginRight: '10px',
  display: 'flex',
  alignItems: 'center',
});

export const StyledFileName = styled('span')({
  flex: 1,
});