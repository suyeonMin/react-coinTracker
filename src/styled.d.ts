import 'styled-components';

declare module 'styled-components'{
    export interface DefaultTheme {
        textColor: string;
        boxTextColor: string;
        bgColor: string;
        accentColor: string;
        homeBtnColor: string;
        listColor: string;
        toggleBtn: string;
        toggleBtnText: string;
    }
}