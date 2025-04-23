import React from 'react';
import {IData_TagItem} from '../types.ts';
import {UserOutlined} from '@ant-design/icons';
import styles from './NewsTags.module.scss';

type Props = {
    tags: IData_TagItem[];
};

const NewsTags: React.FC<Props> = ({tags}) => (
    <div className={styles.tags}>
        {tags.map(tag => (
            <div key={tag.value} className={styles['pill-tag']}>
                <UserOutlined className={styles['tag-icon']}/>
                <span className={styles['tag-text']}>{tag.value}</span>
                <span className={styles['tag-count']}>{tag.count}</span>
            </div>
        ))}
    </div>
);

export default NewsTags;
