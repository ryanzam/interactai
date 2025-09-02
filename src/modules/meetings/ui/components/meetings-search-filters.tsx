import { Input } from '@/components/ui/input'
import React from 'react'
import { useMeetingsFilters } from '../../hooks/use-meetings-filters'
import { SearchIcon } from 'lucide-react'

const MeetingsSearchFilters = () => {

    const [filters, setFilters] = useMeetingsFilters()

    return (
        <div className='relative'>
            <Input className='h-10 bg-white w-[250px] pl-8'
                placeholder='Filter meetings'
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })} />
            <SearchIcon className='absolute size-4 text-muted-foreground left-2 top-1/2 -translate-y-1/2' />
        </div>
    )
}

export default MeetingsSearchFilters