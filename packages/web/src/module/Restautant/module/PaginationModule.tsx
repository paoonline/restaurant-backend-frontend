import { Box, Pagination, styled } from "@mui/material";

const PaginationModule = ({
    callback,
    totalPage,
}: {
    callback(e: React.ChangeEvent<unknown>, value: number): void;
    totalPage: number;
}) => (
    <PaginationContainer>
        <Pagination count={totalPage} onChange={callback} />
    </PaginationContainer>
);

export default PaginationModule

const PaginationContainer = styled(Box)`
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
`;
