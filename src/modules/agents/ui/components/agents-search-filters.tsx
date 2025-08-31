import { Input } from '@/components/ui/input'
import React from 'react'
import { useAgentFilters } from '../../hooks/use-agents-filters'
import { SearchIcon } from 'lucide-react'

const AgentsSearchFilters = () => {

    const [filters, setFilters] = useAgentFilters()

    return (
        <div className='relative'>
            <Input className='h-10 bg-white w-[250px] pl-8'
                placeholder='Filter agents by name'
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })} />
            <SearchIcon className='absolute size-4 text-muted-foreground left-2 top-1/2 -translate-y-1/2' />
        </div>
    )
}

export default AgentsSearchFilters