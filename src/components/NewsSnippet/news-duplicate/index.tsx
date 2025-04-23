import React from 'react';
import {Typography, Space, Tooltip} from 'antd';
import {GlobalOutlined, UserOutlined, InfoCircleOutlined, BorderOutlined} from '@ant-design/icons';
import styles from './NewsDuplicate.module.scss';
import {IData_SnippetNews} from '../types.ts';

const {Text, Title, Link} = Typography;

type Props = {
    data: IData_SnippetNews;
    date: { day: string; month: string; year: string };
    reach: string;
};

const NewsDuplicate: React.FC<Props> = ({data, date, reach}) => (
    <div className={styles['duplicate-item']}>
        <div className={styles['dup-left']}>
            <Text className={styles['dup-date']}>
                {date.day} {date.month} {date.year}
            </Text>
            <Text className={styles['dup-reach']}>
                {reach} K Reach
            </Text>
            <Title level={5} className={styles['dup-title']}>
                <a href={data.URL} target="_blank" rel="noopener noreferrer">
                    {data.TI}
                </a>
            </Title>
            <Space size="small" className={styles['dup-meta']}>
                <GlobalOutlined/>

                <Link
                    className={styles['domain-link']}
                    href={`https://${data.DOM}`}
                    target="_blank"
                >
                    {data.DOM}
                </Link>
                <img
                    className={styles['flag-icon']}
                    src={`https://flagcdn.com/16x12/${data.CNTR_CODE.toLowerCase()}.png`}
                    alt={data.CNTR}
                />
                <Text className={styles['dup-meta-text']}>{data.CNTR}</Text>
                <UserOutlined/>
                <Text className={styles['dup-meta-text']}>
                    {data.AU.length ? data.AU.join(', ') : '—'}
                </Text>
            </Space>
        </div>
        <div className={styles['dup-actions']}>
            <Tooltip title="Info">
                <InfoCircleOutlined/>
            </Tooltip>
            <BorderOutlined/>
        </div>
    </div>
);

export default NewsDuplicate;
