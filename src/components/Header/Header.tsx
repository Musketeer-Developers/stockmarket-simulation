import * as React from 'react';
import { Navbar } from 'react-bootstrap';
import * as ReactDOM from 'react-dom';
import appRoutes from '../../routes/routes';
import html2canvas from 'html2canvas';

interface HeaderProps {
}

interface HeaderState {
    sidebarExists: boolean;
}

export class Header extends React.Component<HeaderProps, HeaderState> {

    constructor(props: HeaderProps) {
        super(props);
        this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
        this.state = {
            sidebarExists: false
        };
    }

    // tslint:disable-next-line no-any
    mobileSidebarToggle(e: any) {
        if (this.state.sidebarExists === false) {
            this.setState({
                sidebarExists: true
            });

        }
        e.preventDefault();
        document.documentElement.classList.toggle('nav-open');
        const node = document.createElement('div');
        node.id = 'bodyClick';
        node.onclick = function () {
            // tslint:disable-next-line no-any
            ReactDOM.findDOMNode(this as any)!.parentElement!.removeChild(this as any);
            document.documentElement.classList.toggle('nav-open');
        };
        document.body.appendChild(node);
    }

    getBrand() {
        const routeIndex = appRoutes.findIndex(r => window.location.pathname.indexOf(r.path) !== -1);
        const appRoute = appRoutes[routeIndex];

        if (appRoute && appRoute.name) {
            return appRoute.name;
        }
        return 'Stockmarket Simulation';
    }
    handleScreenshot() {
        const element = document.getElementById('root');
        if (element) {
            html2canvas(element).then((canvas: HTMLCanvasElement) => {
                const imgData = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = imgData;
                link.download = 'screenshot.png';
                link.click();
            }).catch((error: any) => {
                console.error('Error capturing screenshot:', error);
            });
        } else {
            console.error('Element not found');
        }
    };

    render() {
        return (
            <Navbar fluid={true} >
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">{this.getBrand()}</a>
                    </Navbar.Brand>

                    <Navbar.Toggle onClick={this.mobileSidebarToggle} />
                    <button
                        style={{
                            borderRadius: "50%",
                            width: 30,
                            height: 30,
                            border: "none",
                            position: "absolute",
                            right: 50,
                            top: 15,
                            zIndex: 1000,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        onClick={this.handleScreenshot}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16" >
                            <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                            <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                        </svg>
                    </button>
                </Navbar.Header>

            </Navbar>
        );
    }
}
