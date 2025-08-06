const sidebarStyles1 = {
  drawer: (isSideIcon) => ({
    backgroundColor: '#4389A2',
    flexShrink: 0,
    width: isSideIcon ? 75 : 250,
    '& .MuiDrawer-paper': {
      width: isSideIcon ? 75 : 250,
      boxSizing: 'border-box',
      backgroundColor: '#4389A2',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
    },
  }),

  toolbar: {
    position: 'sticky',
    top: 0,
    zIndex: 2,
    backgroundColor: '#4389A2',
    paddingLeft: '10px',
    minHeight: '64px',
  },

  logoImage: (isSideIcon) => ({
    height: '50px',
    marginLeft: isSideIcon ? '5px' : '-8px',
  }),

  scrollBox: {
    flexGrow: 1,
    overflowY: 'auto',
    height: 'calc(100vh - 64px)',
    '&::-webkit-scrollbar': { width: '4px' },
    '&::-webkit-scrollbar-thumb': { backgroundColor: '#777' },
    padding: 0,
  },

  accordion: {
    backgroundColor: '#4389A2',
    boxShadow: 'none',
    '&.Mui-expanded': {
      margin: 0,
    },
  },

  accordionSummary: {
    paddingY: '2px',
    paddingX: '10px',
    minHeight: 0,
    '& .MuiAccordionSummary-content': {
      alignItems: 'center',
      margin: 0,
    },
  },
  
  accordionDetails: {
    padding: '0px !important',
    '& .MuiAccordionSummary-root': {
      padding:'0px !important'
    },
  },

  iconTextSpacing: {
    marginLeft: '8px',
    textDecoration: 'none',
    color: 'white',
    fontSize: '11px',
  },

  iconWrapper: {
    marginRight: '8px',
    display: 'flex',
    alignItems: 'center',
  },

  listItemButton: (isSelected) => ({
    paddingY: '6px', // Slight vertical breathing
    paddingLeft: '20px',
    fontSize: '11px',
    lineHeight: '5px',
    backgroundColor: isSelected ? '#4389A2' : 'inherit',
    color: isSelected ? '#fff' : 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '& .MuiListItemText-primary': {
      fontSize: '11px',
      color: isSelected ? '#fff' : 'white',
      lineHeight: '18px',
    },
    '& svg': {
      color: isSelected ? '#fff' : 'white',  // force icon color white
      fontSize: '18px',
    },
    '&:hover': {
      backgroundColor: '#4389A2',
      color: '#fff',
      '& svg': {
        color: '#fff',
      },
    },
  }),

  popoverButton: (isSelected) => ({
    fontSize: '12px',
    paddingY: '6px',
    paddingLeft: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: isSelected ? '#4389A2' : 'inherit',
    color: isSelected ? '#fff' : 'white',
    '& .MuiListItemText-root': {
      fontSize: '12px',
      color: isSelected ? '#fff' : 'white',
    },
    '& svg': {
      color: isSelected ? '#fff' : 'white',
      fontSize: '18px',
    },
    '&:hover': {
      backgroundColor: '#4389A2',
      color: '#fff',
      '& svg': {
        color: '#fff',
      },
    },
  }),
};

export default sidebarStyles;
