export const textFieldStyles = {
  backgroundColor: '#3C3C3C',
  borderRadius: 1,
  '& .MuiInputBase-input': {
    color: '#ffffff',
  },
  '& .MuiInputLabel-root': {
    color: '#ffffff',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.23)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
    },
  },
};

export const dialogStyles = {
  '& .MuiDialog-paper': {
    backgroundColor: '#2C2C2C',
    color: '#ffffff',
  },
  '& .MuiDialogTitle-root': {
    backgroundColor: '#232323',
  },
  '& .MuiDialogContent-root': {
    backgroundColor: '#2C2C2C',
  },
  '& .MuiDialogActions-root': {
    backgroundColor: '#232323',
    padding: 2,
  }
};

export const cardStyles = {
  backgroundColor: '#3C3C3C',
  '&:hover': {
    backgroundColor: '#444444',
  }
}; 