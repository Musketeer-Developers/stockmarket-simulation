// global.d.ts
interface Window {
    googleTranslateElementInit: () => void;
    google: {
        translate: {
            TranslateElement: new (options: object, container: string) => void;
        };
    };
}
