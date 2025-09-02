import { Button } from '@/components/ui/button'
import React from 'react'

interface DataTablePaginationProps {
    page: number
    totalPages: number
    onPageChange: (page: number) => void
}

export const DataTablePagination = ({ page, totalPages, onPageChange }: DataTablePaginationProps) => {

    return (
        <div className='flex items-center justify-between py-3'>
            <div className='flex-1 text-sm text-muted-foreground'>
                Page {page} of {totalPages || 1}
            </div>
            <div>
                <Button variant={"outline"}
                    disabled={page === 1}
                    size={"sm"}
                    onClick={() => onPageChange(Math.max(1, page - 1))}
                >
                    Previous
                </Button>

                <Button variant={"outline"}
                    disabled={page === totalPages || totalPages === 0}
                    size={"sm"}
                    onClick={() => onPageChange(Math.min(totalPages, page + 1))}>
                    Next
                </Button>
            </div>
        </div>
    )
}
