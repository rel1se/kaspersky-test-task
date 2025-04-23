import React from 'react';
import {Typography, Tooltip} from 'antd';
import {
    InfoCircleOutlined,
    BorderOutlined
} from '@ant-design/icons';
import classNames from 'classnames';
import styles from './NewsHeader.module.scss';
import {IData_SnippetNews} from '../types.ts';

const {Text} = Typography;

type Props = {
    data: IData_SnippetNews;
    date: { day: string; month: string; year: string };
    reach: string;
};

const NewsHeader: React.FC<Props> = ({data, date, reach}) => {
    const sentimentClass = classNames(
        styles['meta-sentiment'],
        {
            [styles['meta-sentiment--positive']]: data.SENT === 'positive',
            [styles['meta-sentiment--negative']]: data.SENT === 'negative',
            [styles['meta-sentiment--neutral']]:
            data.SENT !== 'positive' && data.SENT !== 'negative',
        }
    );

    return (
        <div className={styles['meta-top']}>
            <Text className={styles['meta-date']}>
                <span className={styles['meta-date-number']}>{date.day}</span>{' '}
                <span className={styles['meta-date-rest']}>
          {date.month} {date.year}
        </span>
            </Text>

            <Text className={styles['meta-reach']}>
                <span className={styles['meta-reach-number']}>{reach}</span>{''}
                <span className={styles['meta-reach-rest']}>K Reach</span>
            </Text>

            <Text className={styles['meta-traffic']}>
                Top Traffic:&nbsp;
                {data.TRAFFIC.map((t, i) => (
                    <React.Fragment key={i}>
            <span className={styles['meta-traffic-value']}>
              {t.value}
            </span>{' '}
                        <span className={styles['meta-traffic-percent']}>
              {(t.count * 100).toFixed(0)}%
            </span>
                        {i < data.TRAFFIC.length - 1 && '  '}
                    </React.Fragment>
                ))}
            </Text>

            <div className={styles['meta-actions']}>
                <Text className={sentimentClass}>
                    {data.SENT.charAt(0).toUpperCase() + data.SENT.slice(1)}
                </Text>
                <Tooltip title="Info">
                    <InfoCircleOutlined/>
                </Tooltip>
                <BorderOutlined/>
            </div>
        </div>
    );
};

export default NewsHeader;
