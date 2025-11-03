import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationParamsT {
  page: number;
  totalObjects?: number;
  onChange: (value: number) => void;
}

const PaginationComponent: React.FC<PaginationParamsT> = ({
  page,
  totalObjects,
  onChange,
}) => {
  const totalPage = () => {
    if (totalObjects) {
      return Math.ceil(totalObjects / 10);
    }
    return 1;
  };

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                onChange(page - 1);
              }}
            />
          </PaginationItem>
        )}

        {page > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink>{page}</PaginationLink>
        </PaginationItem>

        {page < totalPage() && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {page < totalPage() && (
          <PaginationItem
            onClick={() => {
              onChange(page + 1);
            }}
          >
            <PaginationNext />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
