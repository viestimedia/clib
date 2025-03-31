import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Link } from '..';
import styles from './Breadcrumb.module.scss';

export type BreadcrumbItem = {
  label: string;
  id: string;
  url: string;
  isHidden?: boolean;
};

type Props = {
  items: BreadcrumbItem[];
};

export const Breadcrumb = ({ items }: Props) => {
  const [visibleItems, setVisibleItems] = useState(items);
  const breadcrumbRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateVisibleItems = () => {
      const ellipsisWidth = 20;
      const containerWidth = breadcrumbRef.current?.offsetWidth || 0;
      let totalWidth = 0;
      const itemWidths = [];
      const newVisibleItems = [...items];

      // Calculate initial total width
      for (let i = 0; i < items.length; i++) {
        const itemWidth = breadcrumbRef.current?.children[i]?.clientWidth || 0;
        totalWidth += itemWidth;
        itemWidths.push(itemWidth);
      }

      // If width is more than container width, let's hide as many items as  needed
      if (totalWidth > containerWidth) {
        let newWidth = totalWidth;
        // Always show first item and start hiding from the second one
        for (let i = 1; i < newVisibleItems.length - 1; i++) {
          if (newWidth <= containerWidth) break;

          const currentItemWidth = itemWidths[i];
          newVisibleItems[i].isHidden = true;

          newWidth = newWidth - currentItemWidth + ellipsisWidth;
        }
      }

      setVisibleItems(newVisibleItems);
    };

    updateVisibleItems();

    // When window is resized, we are updating the visible items but it only works when the window is made smaller
    // since we don't know what's the width of the link item when it's not visible
    window.addEventListener('resize', updateVisibleItems);

    return () => {
      window.removeEventListener('resize', updateVisibleItems);
    };
  }, [items]);

  return (
    <div className={styles.breadcrumbContainer} ref={breadcrumbRef}>
      {visibleItems.map((item, index) => (
        <span key={item.id} className={styles.breadcrumbItem}>
          {index < visibleItems.length - 1 ? (
            <span
              className={`${styles.breadcrumbLink} ${item.isHidden ? styles.hidden : ''}`}
            >
              <Link href={item.url}>{item.label}</Link>
            </span>
          ) : (
            <>{item.label}</>
          )}
        </span>
      ))}
    </div>
  );
};
