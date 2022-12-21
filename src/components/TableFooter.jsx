import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

function TablePaginationActions(props){
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange, rows, rowData } = props;

//   const handleFirstPageButtonClick = (event) => {
//     onPageChange(event, 0);
//   };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page-1, props.backIconButtonProps.previous);

  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, (page+1), props.nextIconButtonProps.next);
  };

//   const handleLastPageButtonClick = (event) => {
//     onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//   };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <ArrowCircleRightOutlinedIcon /> : <ArrowCircleLeftOutlinedIcon />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <ArrowCircleLeftOutlinedIcon /> : <ArrowCircleRightOutlinedIcon />}
      </IconButton>
    </Box>
  );
}

function EnhancedTableFooter(props){
    const {count, page, handleChangePage, rowsPerPage, rowData} = props;
    return (
        <TableFooter>
            <TableRow>
                <TablePagination
                    rowsPerPageOptions={[]}
                    // component="div"
                    // colSpan={3}
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    SelectProps={rowData}
                    rowdata={rowData}
                    ActionsComponent={TablePaginationActions}
                    nextIconButtonProps={rowData}
                    backIconButtonProps={rowData}
                />
            </TableRow>
        </TableFooter>
    )
}

export default EnhancedTableFooter;