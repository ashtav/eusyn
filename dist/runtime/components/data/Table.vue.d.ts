import type { PropType, Ref } from 'vue';
declare const _default: import("vue").DefineComponent<{
    columns: {
        type: PropType<Array<Column>>;
        default: () => never[];
    };
    rows: {
        type: PropType<Array<Record<string, any>> | TableRows>;
        default: () => never[];
    };
    pagination: {
        type: PropType<TablePagination>;
        default: {
            client: boolean;
            meta: Meta;
            length: number;
            paginate: (page: number) => any;
        };
    };
    entries: {
        type: PropType<TableEntries>;
        default: {
            entries: number[];
            entry: (value: number) => void;
        };
    };
    config: {
        type: PropType<TableConfig>;
        default: {
            emptyMessage: string;
            loadingNumber: number;
        };
    };
    loading: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    maxHeight: {
        type: StringConstructor;
    };
}, {
    keys: any[];
    headers: Ref<Record<string, any>[]>;
    dataTable: Ref<Record<string, any>>;
    doSortBy: (data: Record<string, any>) => void;
    entries: Ref<number[]>;
    onEntries: (data: any) => void;
    meta: Ref<any>;
    entry: Ref<any>;
    active: Ref<number>;
    onNavigate: (page: number) => void;
    pageNumber: () => Array<number>;
    rowOptions: Ref<Function>;
    rowActions: Ref<Function>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    columns: {
        type: PropType<Array<Column>>;
        default: () => never[];
    };
    rows: {
        type: PropType<Array<Record<string, any>> | TableRows>;
        default: () => never[];
    };
    pagination: {
        type: PropType<TablePagination>;
        default: {
            client: boolean;
            meta: Meta;
            length: number;
            paginate: (page: number) => any;
        };
    };
    entries: {
        type: PropType<TableEntries>;
        default: {
            entries: number[];
            entry: (value: number) => void;
        };
    };
    config: {
        type: PropType<TableConfig>;
        default: {
            emptyMessage: string;
            loadingNumber: number;
        };
    };
    loading: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    maxHeight: {
        type: StringConstructor;
    };
}>>, {
    entries: any;
    config: any;
    columns: Column[];
    rows: any;
    pagination: any;
    loading: boolean;
}, {}>;
export default _default;
