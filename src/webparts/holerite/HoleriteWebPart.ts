import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, BaseWebPart, WebPartContext } from '@microsoft/sp-webpart-base';

import * as strings from 'HoleriteWebPartStrings';
import Holerite from './components/Holerite';

export interface HoleriteWebPartProps {
  description: string;
  context: WebPartContext;
  properties: any;
}
export default class HoleriteWebPart extends BaseClientSideWebPart<HoleriteWebPartProps> {
  public render(): void {
    const element: React.ReactElement<HoleriteWebPartProps> = React.createElement(
      Holerite,
      {
        description: this.properties.description,
        context:  this.context,
        properties: this.properties
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
