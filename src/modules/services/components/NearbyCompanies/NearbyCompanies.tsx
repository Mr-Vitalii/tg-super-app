import React from 'react'
import NearbyList from '@/modules/services/components/NearbyList/NearbyList'
import styles from './NearbyCompanies.module.scss'
import { NearbyCompany } from '@/common/types/сompany'

interface NearbyCompaniesProps {
  nearby: NearbyCompany[]
  selectedId?: string | null
  onSelect: (company: NearbyCompany) => void
  /* onShowOnMap?: (company: NearbyCompany) => void */
  className?: string
}

const NearbyCompanies: React.FC<NearbyCompaniesProps> = ({
  nearby,
  selectedId,
  onSelect,
  /*  onShowOnMap, */
  className = '',
}) => {
  return (
    <div className={`${styles.root} ${className}`}>
      <h3 className={styles.title}>Рядом с вами</h3>

      <NearbyList
        items={nearby}
        selectedId={selectedId}
        onSelect={onSelect}
        /*  onShowOnMap={onShowOnMap} */
      />
    </div>
  )
}

export default NearbyCompanies
