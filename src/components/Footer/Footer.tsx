import * as React from 'react';
import { Grid } from 'react-bootstrap';
// import { FooterLink } from './FooterLink';

interface FooterProps {
}

interface FooterState {
}

export class Footer extends React.Component<FooterProps, FooterState> {

    constructor( props: FooterProps ) {
        super( props );
    }

    getFooterLinks() {
        return (
            <ul>
            </ul>
        );
    }

    render() {
        return (
            <footer className="footer">
                <Grid bsClass={''}>
                    <nav className="pull-left small-padding-left">
                        {this.getFooterLinks()}
                    </nav>
                </Grid>
            </footer>
        );
    }
}