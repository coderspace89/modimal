import type { Schema, Struct } from '@strapi/strapi';

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
      'elements.header-icons': ElementsHeaderIcons;
      'layout.header': LayoutHeader;
    }
  }
}
