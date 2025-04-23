import React from 'react';
import {Typography} from 'antd';
import {
    GlobalOutlined,
    BookOutlined,
    UserOutlined
} from '@ant-design/icons';
import styles from './NewsMeta.module.scss';
import {IData_SnippetNews} from '../types.ts';

const {Link, Text} = Typography;

type Props = {
    data: IData_SnippetNews;
};

const NewsMeta: React.FC<Props> = ({data}) => (
    <div className={styles.subheader}>
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
        <Text className={styles['sub-text']}>{data.CNTR}</Text>

        <BookOutlined/>
        <Text className={styles['sub-text']}>{data.LANG.toUpperCase()}</Text>

        <UserOutlined/>
        <Text className={styles['sub-text']}>
            {data.AU.length ? data.AU.join(', ') : '—'}
        </Text>
    </div>
);

export default NewsMeta;
