// ----------------------------------------------------------------------

export default function Menu(theme) {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          mx: 1,
          '&.Mui-selected': {
            borderRadius: 0.75,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          },
        },
      },
    },
  };
}
