import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Tabs,
    Tab,
    Typography,
    Box
} from '@mui/material';
import NavBar from '../generalComponents/NavBar';
import { useTranslation } from 'react-i18next';
import Visits from './Visits';
import Workers from './Workers';
import Clients from './Clients';
import Procedures from './Procedures';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function HomePage() {
    const [t] = useTranslation('global');
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Translations (converted from Polish to English)
    const localizedTextsMap = {
        // Root
        noRowsLabel: 'No data',
        noResultsOverlayLabel: 'No results found.',

        // Density selector toolbar button text
        toolbarDensity: 'Row height',
        toolbarDensityLabel: 'Row height',
        toolbarDensityCompact: 'Compact',
        toolbarDensityStandard: 'Standard',
        toolbarDensityComfortable: 'Comfortable',

        // Columns selector toolbar button text
        toolbarColumns: 'Columns',
        toolbarColumnsLabel: 'Show columns',

        // Filters toolbar button text
        toolbarFilters: 'Filters',
        toolbarFiltersLabel: 'Show filters',
        toolbarFiltersTooltipHide: 'Hide filters',
        toolbarFiltersTooltipShow: 'Show filters',
        toolbarFiltersTooltipActive: (count) => `Active filters: ${count}`,

        // Quick filter toolbar field
        toolbarQuickFilterPlaceholder: 'Search…',
        toolbarQuickFilterLabel: 'Search',
        toolbarQuickFilterDeleteIconLabel: 'Clear',

        // Export selector toolbar button text
        toolbarExport: 'Export',
        toolbarExportLabel: 'Export',
        toolbarExportCSV: 'Download as CSV',
        toolbarExportPrint: 'Print',
        toolbarExportExcel: 'Download as Excel',

        // Columns management text
        columnsManagementSearchTitle: 'Search',
        columnsManagementShowHideAllText: 'Show/Hide all',
        columnsManagementReset: 'Reset',

        // Filter panel text
        filterPanelAddFilter: 'Add filter',
        filterPanelRemoveAll: 'Remove all',
        filterPanelDeleteIconLabel: 'Delete',
        filterPanelLogicOperator: 'Logical operator',
        filterPanelOperator: 'Operator',
        filterPanelOperatorAnd: 'And',
        filterPanelOperatorOr: 'Or',
        filterPanelColumns: 'Columns',
        filterPanelInputLabel: 'Value',
        filterPanelInputPlaceholder: 'Filter value',

        // Filter operators text
        filterOperatorContains: 'contains',
        filterOperatorEquals: 'equals',
        filterOperatorStartsWith: 'starts with',
        filterOperatorEndsWith: 'ends with',
        filterOperatorIs: 'is',
        filterOperatorNot: 'is not',
        filterOperatorAfter: 'greater than',
        filterOperatorOnOrAfter: 'greater than or equal to',
        filterOperatorBefore: 'less than',
        filterOperatorOnOrBefore: 'less than or equal to',
        filterOperatorIsEmpty: 'is empty',
        filterOperatorIsNotEmpty: 'is not empty',
        filterOperatorIsAnyOf: 'is any of',

        // Header filter operators text
        headerFilterOperatorContains: 'Contains',
        headerFilterOperatorEquals: 'Equals',
        headerFilterOperatorStartsWith: 'Starts with',
        headerFilterOperatorEndsWith: 'Ends with',
        headerFilterOperatorNot: 'Not empty',

        // Filter values text
        filterValueAny: 'any',
        filterValueTrue: 'true',
        filterValueFalse: 'false',

        // Column menu text
        columnMenuLabel: 'Menu',
        columnMenuShowColumns: 'Show all columns',
        columnMenuManageColumns: 'Manage columns',
        columnMenuFilter: 'Filter',
        columnMenuHideColumn: 'Hide',
        columnMenuUnsort: 'Unsort',
        columnMenuSortAsc: 'Sort ascending',
        columnMenuSortDesc: 'Sort descending',

        // Column header text
        columnHeaderFiltersTooltipActive: (count) => `Active filters: ${count}`,
        columnHeaderFiltersLabel: 'Show filters',
        columnHeaderSortIconLabel: 'Sort',

        // Rows selected footer text
        footerRowSelected: (count) => `Rows selected: ${count.toLocaleString()}`,

        // Total row amount footer text
        footerTotalRows: 'Total rows:',

        // Total visible row amount footer text
        footerTotalVisibleRows: (visibleCount, totalCount) =>
            `${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`,

        // Checkbox selection text
        checkboxSelectionHeaderName: 'Checkbox',
        checkboxSelectionSelectAllRows: 'Select all rows',
        checkboxSelectionUnselectAllRows: 'Unselect all rows',
        checkboxSelectionSelectRow: 'Select row',
        checkboxSelectionUnselectRow: 'Unselect row',

        // Boolean cell text
        booleanCellTrueLabel: 'yes',
        booleanCellFalseLabel: 'no',

        // Actions cell more text
        actionsCellMore: 'more',

        // Column pinning text
        pinToLeft: 'Pin to left',
        pinToRight: 'Pin to right',
        unpin: 'Unpin',

        // Tree Data
        treeDataGroupingHeaderName: 'Group',
        treeDataExpand: 'show child elements',
        treeDataCollapse: 'hide child elements',

        // Grouping columns
        groupingColumnHeaderName: 'Group',
        groupColumn: (name) => `Group by ${name}`,
        unGroupColumn: (name) => `Ungroup ${name}`,

        // Master/detail
        expandDetailPanel: 'Expand',
        collapseDetailPanel: 'Collapse',

        // Row reordering text
        rowReorderingHeaderName: 'Row reordering',

        // Aggregation
        aggregationMenuItemHeader: 'Aggregation',
        aggregationFunctionLabelSum: 'sum',
        aggregationFunctionLabelAvg: 'average',
        aggregationFunctionLabelMin: 'minimum',
        aggregationFunctionLabelMax: 'maximum',
        aggregationFunctionLabelSize: 'size',
    };

    return (
        <Box>
            <NavBar />
            <div className="pageContainer">
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Tickets" sx={{ width: '15vw' }} {...a11yProps(0)} />
                            <Tab label="Clients" sx={{ width: '15vw' }} {...a11yProps(1)} />
                            <Tab label="Worker" sx={{ width: '15vw' }} {...a11yProps(2)} />
                            <Tab label="Attractions" sx={{ width: '15vw' }} {...a11yProps(3)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Visits localText={localizedTextsMap} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Clients localText={localizedTextsMap} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <Workers localText={localizedTextsMap} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        <Procedures localText={localizedTextsMap} />
                    </CustomTabPanel>
                </Box>
            </div>
        </Box>
    );
}