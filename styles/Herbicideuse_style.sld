<!--SLD file created with GeoCat Bridge premium v1.1.0 using ArcGIS Desktop with Geoserver extensions.
 Date: 14 november 2012
 See www.geocat.net for more details-->
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
  version="1.0.0">
  <NamedLayer>
    <Name>Herbicide_use</Name>
    <UserStyle>
      <Name>Herbicideuse_style</Name>
      <Title>Herbicideuse style</Title>
      <FeatureTypeStyle>
        <Rule>
          <Name>&gt; 3 times a year</Name>
          <Title>&gt; 3 times a year</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>herbicides</ogc:PropertyName> <ogc:Literal><![CDATA[3]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#A80000</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>2-3 times a year</Name>
          <Title>2-3 times a year</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>herbicides</ogc:PropertyName> <ogc:Literal><![CDATA[2]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#E60000</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name> 1 time a year</Name>
          <Title> 1 time a year</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>herbicides</ogc:PropertyName> <ogc:Literal><![CDATA[1]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#FF7F7F</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>none</Name>
          <Title>none</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>herbicides</ogc:PropertyName> <ogc:Literal><![CDATA[0]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#CCCCCC</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>