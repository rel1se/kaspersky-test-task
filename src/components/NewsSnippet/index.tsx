import React, { useState } from 'react';
import {Card, Typography, Button, Menu, Dropdown} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import NewsHeader from './news-header';
import NewsMeta from './news-meta';
import NewsBody from './news-body';
import NewsTags from './news-tags';
import NewsDuplicate from './news-duplicate';
import styles from './NewsSnippet.module.scss';
import { IData_SnippetNews } from './types';

const { Title, Text, Link } = Typography;

const FILTERS = ['By Relevance', 'By Date', 'By Reach'];

type Props = {
    data: IData_SnippetNews & { DUPLICATES?: IData_SnippetNews[] };
};

const NewsSnippet: React.FC<Props> = ({ data }) => {
    const [expanded, setExpanded] = useState(false);
    const [showAllTags, setShowAllTags] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(FILTERS[0]);
    const [showAllDuplicates, setShowAllDuplicates] = useState(false);

    const rawDate = new Date(data.DP).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric'
    });
    const [day, month, year] = rawDate.split(' ');

    const humanReach = (data.REACH / 1000).toFixed(0);

    const visibleTags = showAllTags ? data.KW : data.KW.slice(0, 3);
    const hiddenCount = data.KW.length - visibleTags.length;
    const rawDuplicates = Array.from({ length: 3 }, (_, i) => ({
        ...data,
        ID: data.ID + i + 1,
        TI: `Duplicate ${i + 1}: ${data.TI}`,
        URL: data.URL.replace("101944", `10194${i + 1}`),
        REACH: data.REACH + i * 1000,
        DP: new Date(new Date(data.DP).getTime() - i * 86400000).toISOString(), // каждый следующий -1 день
    }));

    const sortedDuplicates = [...rawDuplicates].sort((a, b) => {
        switch (selectedFilter) {
            case 'By Date':
                return new Date(b.DP).getTime() - new Date(a.DP).getTime();
            case 'By Reach':
                return b.REACH - a.REACH;
            case 'By Relevance':
            default:
                return a.ID - b.ID;
        }
    });

    const duplicatesCount = rawDuplicates.length;

    return (
        <Card className={styles['news-snippet']}>
            <NewsHeader
                data={data}
                date={{ day, month, year }}
                reach={humanReach}
            />

            <div className={styles.header}>
                <Title level={4} className={styles['title-link']}>
                    <Link href={data.URL} target="_blank">
                        {data.TI}
                    </Link>
                </Title>
            </div>

            <NewsMeta data={data} />

            <NewsBody
                abstract={data.AB}
                expanded={expanded}
                setExpanded={setExpanded}
            />

            <NewsTags tags={visibleTags} />
            {hiddenCount > 0 && !showAllTags && (
                <Text
                    className={styles['show-all-tags']}
                    onClick={() => setShowAllTags(true)}
                >
                    Show All +{hiddenCount}
                </Text>
            )}

            <div className={styles['original-source']}>
                <Button
                    type="default"
                    href={data.URL}
                    target="_blank"
                    size="large"
                    rel="noopener noreferrer"
                    className={styles['original-source-button']}
                >
                    Original Source
                </Button>
            </div>


            <div className={styles['duplicates-header']}>
                <h1 className={styles['duplicates-title']}>
                    Duplicates: {duplicatesCount}
                </h1>
                <Dropdown
                    trigger={['click']}
                    overlay={
                        <Menu selectedKeys={[selectedFilter]} onClick={({ key }) => setSelectedFilter(key)}>
                            {FILTERS.map(f => <Menu.Item key={f}>{f}</Menu.Item>)}
                        </Menu>
                    }
                    placement="bottomRight"
                >
                    <Button type="link" className={styles['filter-button']}>
                        {selectedFilter} <DownOutlined />
                    </Button>
                </Dropdown>
            </div>

            {(showAllDuplicates ? sortedDuplicates : sortedDuplicates.slice(0, 1)).map((dup, i) => (
                <NewsDuplicate
                    key={dup.ID || i}
                    data={dup}
                    date={{ day, month, year }}
                    reach={humanReach}
                />
            ))}

            {rawDuplicates.length > 1 && (
                <Button
                    block
                    type="default"
                    size="large"
                    className={styles['view-duplicates']}
                    onClick={() => setShowAllDuplicates(prev => !prev)}
                >
                    <DownOutlined style={{ transform: showAllDuplicates ? 'rotate(180deg)' : 'none' }} />
                    {showAllDuplicates ? 'Hide Duplicates' : 'View Duplicates'}
                </Button>
            )}

        </Card>
    );
};

export default NewsSnippet;
