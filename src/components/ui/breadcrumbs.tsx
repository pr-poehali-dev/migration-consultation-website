import React from 'react';
import Icon from './icon';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex" itemScope itemType="https://schema.org/BreadcrumbList">
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center" itemScope itemType="https://schema.org/ListItem">
            {item.href && !item.current ? (
              <a 
                href={item.href} 
                className="text-gray-500 hover:text-gray-700 transition-colors"
                itemProp="item"
              >
                <span itemProp="name">{item.label}</span>
              </a>
            ) : (
              <span 
                className={`${item.current ? 'text-gray-900 font-medium' : 'text-gray-500'}`}
                itemProp="name"
                aria-current={item.current ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
            <meta itemProp="position" content={String(index + 1)} />
            
            {index < items.length - 1 && (
              <Icon name="ChevronRight" size={16} className="text-gray-400 ml-2" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;