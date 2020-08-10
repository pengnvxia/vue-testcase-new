declare module 'ant-design-vue/es/modal/confirm';
declare module 'ant-design-vue/lib/locale-provider/zh_CN';
declare module '@/utils/deepClone';
declare module 'vue-lottie';
interface AntColumns {
    title: string;
    key: string;
    dataIndex?: string;
    scopedSlots?: any;
    width?: number | string;
    align?: string;
    fixed?: string;
    ellipsis?: boolean;
    permid?: number;
}

interface AntTable {
    header?: boolean;
    addBtn?: boolean;
    editBtn?: boolean;
    rowKey: string;
    columns: AntColumns[];
    slots?: string[];
}

interface AntMenuTop {
    route?: string;
    title: string;
}


interface Antlayout {
    xs?: LayoutSpan;
    sm?: LayoutSpan;
    md?: LayoutSpan;
    lg?: LayoutSpan;
    xl?: LayoutSpan;
    xxl?: LayoutSpan;
}

interface LayoutSpan {
    span: number;
}

interface SelectOption {
    label: string;
    value: string | number;
    id?: number;
}
