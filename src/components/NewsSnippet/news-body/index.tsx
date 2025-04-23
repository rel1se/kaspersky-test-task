import React from 'react';
import parse from 'html-react-parser';
import { Typography } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import styles from './NewsBody.module.scss';

const { Paragraph, Text } = Typography;

type Props = {
    abstract: string;
    expanded: boolean;
    setExpanded: (v: boolean) => void;
};

const NewsBody: React.FC<Props> = ({ abstract, expanded, setExpanded }) => {
    const renderHtml = (html: string) =>
        parse(html.replace(/<kw>(.*?)<\/kw>/g, '<strong>$1</strong>'));

    return (
        <>
            <Paragraph className={`${styles.body} ${expanded ? styles.expanded : ''}`}>
                {renderHtml(abstract)}
            </Paragraph>
            <Text
                className={styles['show-more']}
                onClick={() => setExpanded(!expanded)}
            >
                {expanded ? 'Show less' : 'Show more'}{' '}
                <CaretDownOutlined style={{ transform: expanded ? 'rotate(180deg)' : 'none' }} />
            </Text>
        </>
    );
};

export default NewsBody;
