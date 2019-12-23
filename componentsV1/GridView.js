import { dom as d } from '../lib/state-ui-lib/index.js';
import VideosRow from './VideosRow.js';
import Billboard from './Billboard.js';

const RowView = ({
    rowIdx,
    rows,
    billboards,
    videos,
    inlineBillboardIn,
    fadeIn    
}) => {
    const videoIds = rows[rowIdx];
    if (!videoIds) {
        return undefined;
    }

    // Check for billboard rows
    if (billboards[rowIdx]) {
        return Billboard({
            rowId: rowIdx,
            videoIds,
            structure: billboards[rowIdx],
            videos,
            inlineBillboardIn,
            fadeIn
        });
    }

    return VideosRow({
        rowId: rowIdx,
        videoIds,
        videos
    })
}

{/*
    <ul id="grid">
        <Billboard/>
        <VideosRow/>
        <VideosRow/>
        ...
    </ul>
*/}
const GridView = ({
    loadedRows,
    rows,
    billboards,
    videos,
    inlineBillboardIn,
    fadeIn
}) => {
    return d(
        'ul',
        {
            id: 'grid'
        },
        loadedRows.map((loadedRowIdx) => {
            return RowView({
                rowIdx: loadedRowIdx,
                loadedRows,
                rows,
                billboards,
                videos,
                inlineBillboardIn,
                fadeIn                 
            });
        })
    );
}

export {
    GridView,
    RowView
};