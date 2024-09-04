import React, { useMemo } from 'react';

import styles from './styles.scss';
import TrackTable, { TrackTableProps } from '.';
import { Track } from '../../types';
import DateCell from './Cells/DateCell';
import { TrackTableColumn } from './types';
import { GridTrackTable } from '../GridTrackTable';
import { Column } from 'react-table';
import { TextHeader } from '../GridTrackTable/Headers/TextHeader';

export type HistoryTableTrack = Track & {
    createdAt: Date;
}

type HistoryTableProps = TrackTableProps<HistoryTableTrack> & {
  dateHeader?: string;
};

const HistoryTable: React.FC<HistoryTableProps> = ({ tracks, dateHeader, ...props }) => {
  const customColumns = useMemo(() => [{
    id: TrackTableColumn.Date,
    Header: ({ column }) => <TextHeader  column={column} header={dateHeader} />,
    accessor: (track: HistoryTableTrack) => track.createdAt.toLocaleString(),
    Cell: DateCell,
    columnnWidth: '3em'
  } as Column<HistoryTableTrack>], []);

  return <GridTrackTable
    className={styles.history_table}
    tracks={tracks}
    customColumns={customColumns}
    displayHeaders={false}
    displayPosition={false}
    displayThumbnail={false}
    selectable={false}
    {...props}
  />;
};

export default HistoryTable;
