import * as React from 'react';
import Card from '../../../components/Card';
import { FinancialSnapshot } from '../../../state/AppState';
import { CapitalConfig } from '../../../state/Config';
import FinancialDevelopmentChart from '../../../components/Charts/FinancialDevelopmentChart';

interface CapitalDevelopmentProps {
    values: FinancialSnapshot[];
}

export class CapitalDevelopment extends React.Component<CapitalDevelopmentProps> {

    render() {
        return (
            <Card title={'Portfolio Value'} noFooter={true}>
                <FinancialDevelopmentChart
                    valueHistory={this.props.values}
                    interval={CapitalConfig.points() / 6}
                    yAxisDomain={[0, 'auto']}
                />
            </Card>
        );
    }
}
