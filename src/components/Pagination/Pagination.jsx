import { Box, Typography, Select, MenuItem, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Pagination = ({
    page,
    rowsPerPage,
    totalCount,
    onPageChange,
    onRowsPerPageChange
}) => {
    const from = totalCount === 0 ? 0 : page * rowsPerPage + 1;
    const to = Math.min((page + 1) * rowsPerPage, totalCount);

    return (
        <Box sx={{
            width: '100%',
            borderTop: '1px solid #eee',
            display: 'flex',
            alignItems: 'center',
            px: 2,
            py: 1,
            gap: 1,
            justifyContent: 'flex-end'
        }}>
            <Typography sx={{ fontSize: 15, mr: 1, color: 'text.primary' }}>Rows per page:</Typography>
            <Select
                value={rowsPerPage}
                onChange={onRowsPerPageChange}
                size="small"
                sx={{ fontSize: 15, width: 60 }}
            >
                {[5, 10, 15].map((rows) => (
                    <MenuItem key={rows} value={rows}>{rows}</MenuItem>
                ))}
            </Select>
            <Typography sx={{ fontSize: 15, mx: 2, color: 'text.primary' }}>{from}–{to} of {totalCount}</Typography>
            <IconButton onClick={() => onPageChange(page - 1)} disabled={page === 0}>
                <ChevronLeftIcon />
            </IconButton>
            <IconButton onClick={() => onPageChange(page + 1)} disabled={to >= totalCount}>
                <ChevronRightIcon />
            </IconButton>
        </Box>
    );
};

export default Pagination;
