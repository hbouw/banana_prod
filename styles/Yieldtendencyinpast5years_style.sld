<!--SLD file created with GeoCat Bridge premium v1.1.0 using ArcGIS Desktop with Geoserver extensions.
 Date: 14 november 2012
 See www.geocat.net for more details-->
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
  version="1.0.0">
  <NamedLayer>
    <Name>Yield_tendency_in_past_5_years</Name>
    <UserStyle>
      <Name>Yieldtendencyinpast5years_style</Name>
      <Title>Yieldtendencyinpast5years style</Title>
      <FeatureTypeStyle>
        <Rule>
          <Name>increasing</Name>
          <Title>increasing</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>yield_tend</ogc:PropertyName> <ogc:Literal><![CDATA[1]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#38A800</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>stable</Name>
          <Title>stable</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>yield_tend</ogc:PropertyName> <ogc:Literal><![CDATA[0]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#CCCCCC</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name> decline</Name>
          <Title> decline</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>yield_tend</ogc:PropertyName> <ogc:Literal><![CDATA[-1]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#FF0000</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>