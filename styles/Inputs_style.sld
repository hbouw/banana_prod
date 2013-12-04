<!--SLD file created with GeoCat Bridge premium v1.1.0 using ArcGIS Desktop with Geoserver extensions.
 Date: 14 november 2012
 See www.geocat.net for more details-->
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
  version="1.0.0">
  <NamedLayer>
    <Name>Inputs</Name>
    <UserStyle>
      <Name>Inputs_style</Name>
      <Title>Inputs style</Title>
      <FeatureTypeStyle>
        <Rule>
          <Name>certified organic production</Name>
          <Title>certified organic production</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>inputs</ogc:PropertyName> <ogc:Literal><![CDATA[5]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#38A800</CssParameter></Fill></PolygonSymbolizer></Rule>
        <Rule>
          <Name> regular use of high levels of fertilizer,  pesticides or irrigation</Name>
          <Title> regular use of high levels of fertilizer,  pesticides or irrigation</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>inputs</ogc:PropertyName> <ogc:Literal><![CDATA[4]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#FF0000</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name> regular use of moderate levels of fertilizer,  pesticides or irrigation</Name>
          <Title> regular use of moderate levels of fertilizer,  pesticides or irrigation</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>inputs</ogc:PropertyName> <ogc:Literal><![CDATA[3]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#FF7F7F</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name> regular use of low levels of fertilizer,  pesticides or irrigation</Name>
          <Title> regular use of low levels of fertilizer,  pesticides or irrigation</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>inputs</ogc:PropertyName> <ogc:Literal><![CDATA[2]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#FFEBBE</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name> none or very occasional use</Name>
          <Title> none or very occasional use</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>inputs</ogc:PropertyName> <ogc:Literal><![CDATA[1]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#FFFFFF</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>