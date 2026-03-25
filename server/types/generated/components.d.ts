import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksFeaturedItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_featured_items';
  info: {
    displayName: 'Featured Item';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface BlocksMegamenuColumn extends Struct.ComponentSchema {
  collectionName: 'components_blocks_megamenu_columns';
  info: {
    displayName: 'Megamenu Column';
  };
  attributes: {
    columnTitle: Schema.Attribute.String;
    featuredItems: Schema.Attribute.Component<'blocks.featured-item', true>;
    links: Schema.Attribute.Component<'elements.menu-link', true>;
  };
}

export interface ElementsHeaderIcons extends Struct.ComponentSchema {
  collectionName: 'components_elements_header_icons';
  info: {
    displayName: 'Header Icons';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    iconName: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ElementsMenuLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_menu_links';
  info: {
    displayName: 'Menu Link';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    headerIcons: Schema.Attribute.Component<'elements.header-icons', true>;
    logoImage: Schema.Attribute.Media<'images'>;
    logoText: Schema.Attribute.String;
    topbarText: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.featured-item': BlocksFeaturedItem;
      'blocks.megamenu-column': BlocksMegamenuColumn;
      'elements.header-icons': ElementsHeaderIcons;
      'elements.menu-link': ElementsMenuLink;
      'layout.header': LayoutHeader;
    }
  }
}
