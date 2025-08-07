import { styled } from '@mui/system';

export const StyledFileBrowserContainer = styled('div')({
  display: 'flex',
  height: '100%',
  overflowX: 'auto',
  minHeight: '400px',
});

export const StyledFilePane = styled('div')({
  flex: '1 1 250px',
  minWidth: '250px',
  borderRight: '1px solid #e0e0e0',
  overflowY: 'auto',
});

export const StyledList = styled('ul')({
  listStyleType: 'none',
  padding: 0,
  margin: 0,
});

export const StyledFileItem = styled('li')(({ isSelected }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 14px',
  cursor: 'pointer',
  backgroundColor: isSelected ? '#e0e0e0' : 'transparent',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
}));

export const StyledFolderItem = styled('div')(({ isSelected }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 14px',
  cursor: 'pointer',
  backgroundColor: isSelected ? '#e0e0e0' : 'transparent',
  position: 'relative',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
}));

export const StyledFileIcon = styled('span')({
  marginRight: '10px',
  display: 'flex',
  alignItems: 'center',
});

export const StyledFileName = styled('span')({
  flex: 1,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const StyledFolderArrow = styled('span')({
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
});