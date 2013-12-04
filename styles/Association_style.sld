<!--SLD file created with GeoCat Bridge premium v1.1.0 using ArcGIS Desktop with Geoserver extensions.
 Date: 14 november 2012
 See www.geocat.net for more details-->
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
  version="1.0.0">
  <NamedLayer>
    <Name>Association</Name>
    <UserStyle>
      <Name>Association_style</Name>
      <Title>Association style</Title>
      <FeatureTypeStyle>
        <Rule>
          <Name>Frequently replanted Musa monocrop</Name>
          <Title>Frequently replanted Musa monocrop</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>association</ogc:PropertyName> <ogc:Literal><![CDATA[6]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://vertline</WellKnownName><Fill><CssParameter
                        name="fill">#000000</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#000000</CssParameter><CssParameter
                        name="stroke-width">0.5</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>10</Size></Graphic></GraphicFill></Fill></PolygonSymbolizer><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://horline</WellKnownName><Fill><CssParameter
                        name="fill">#000000</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#000000</CssParameter><CssParameter
                        name="stroke-width">0.5</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>10</Size></Graphic></GraphicFill></Fill><Stroke><CssParameter
                name="stroke">#000000</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Perennial Musa monocrop</Name>
          <Title>Perennial Musa monocrop</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>association</ogc:PropertyName> <ogc:Literal><![CDATA[5]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://slash</WellKnownName><Fill><CssParameter
                        name="fill">#000000</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#000000</CssParameter><CssParameter
                        name="stroke-width">0.5</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>10</Size></Graphic></GraphicFill></Fill></PolygonSymbolizer><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://backslash</WellKnownName><Fill><CssParameter
                        name="fill">#000000</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#000000</CssParameter><CssParameter
                        name="stroke-width">0.5</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>10</Size></Graphic></GraphicFill></Fill><Stroke><CssParameter
                name="stroke">#000000</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Musa (2-5 years) with annual crop intercropped</Name>
          <Title>Musa (2-5 years) with annual crop intercropped</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>association</ogc:PropertyName> <ogc:Literal><![CDATA[4]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://horline</WellKnownName><Fill><CssParameter
                        name="fill">#000000</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#000000</CssParameter><CssParameter
                        name="stroke-width">0.5</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>10</Size></Graphic></GraphicFill></Fill><Stroke><CssParameter
                name="stroke">#000000</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Perenial Musa mixed with annual crops</Name>
          <Title>Perenial Musa mixed with annual crops</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>association</ogc:PropertyName> <ogc:Literal><![CDATA[3]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://vertline</WellKnownName><Fill><CssParameter
                        name="fill">#000000</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#000000</CssParameter><CssParameter
                        name="stroke-width">0.5</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>10</Size></Graphic></GraphicFill></Fill><Stroke><CssParameter
                name="stroke">#000000</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Mixed annual crops with Musa (2-5 years)</Name>
          <Title>Mixed annual crops with Musa (2-5 years)</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>association</ogc:PropertyName> <ogc:Literal><![CDATA[2]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://backslash</WellKnownName><Fill><CssParameter
                        name="fill">#000000</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#000000</CssParameter><CssParameter
                        name="stroke-width">0.5</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>10</Size></Graphic></GraphicFill></Fill><Stroke><CssParameter
                name="stroke">#000000</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Association with perennial crops</Name>
          <Title>Association with perennial crops</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>association</ogc:PropertyName> <ogc:Literal><![CDATA[1]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://slash</WellKnownName><Fill><CssParameter
                        name="fill">#000000</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#000000</CssParameter><CssParameter
                        name="stroke-width">0.5</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>10</Size></Graphic></GraphicFill></Fill><Stroke><CssParameter
                name="stroke">#000000</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>