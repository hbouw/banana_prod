<!--SLD file created with GeoCat Bridge premium v1.1.0 using ArcGIS Desktop with Geoserver extensions.
 Date: 14 november 2012
 See www.geocat.net for more details-->
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
  version="1.0.0">
  <NamedLayer>
    <Name>Banana_Bunchy_Top_Virus</Name>
    <UserStyle>
      <Name>BananaBunchyTopVirus_style</Name>
      <Title>BananaBunchyTopVirus style</Title>
      <FeatureTypeStyle>
        <Rule>
          <Name>severe impact on yields or plantation life 10-25%)</Name>
          <Title>severe impact on yields or plantation life 10-25%)</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>bbtv</ogc:PropertyName> <ogc:Literal><![CDATA[4]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#A80000</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>moderate impact on yields or plantation life 10-25%)</Name>
          <Title>moderate impact on yields or plantation life 10-25%)</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>bbtv</ogc:PropertyName> <ogc:Literal><![CDATA[3]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#FF0000</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>limited impact on yields or plantation life (5-10%)</Name>
          <Title>limited impact on yields or plantation life (5-10%)</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>bbtv</ogc:PropertyName> <ogc:Literal><![CDATA[2]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#FFAA00</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>present but very little impact on yields (&lt;5%)</Name>
          <Title>present but very little impact on yields (&lt;5%)</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>bbtv</ogc:PropertyName> <ogc:Literal><![CDATA[1]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#FFFFBE</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>none</Name>
          <Title>none</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>bbtv</ogc:PropertyName> <ogc:Literal><![CDATA[0]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#CCCCCC</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>