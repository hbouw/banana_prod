<!--SLD file created with GeoCat Bridge premium v1.1.0 using ArcGIS Desktop with Geoserver extensions.
 Date: 14 november 2012
 See www.geocat.net for more details-->
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
  version="1.0.0">
  <NamedLayer>
    <Name>Irrigation</Name>
    <UserStyle>
      <Name>Irrigation_style</Name>
      <Title>Irrigation style</Title>
      <FeatureTypeStyle>
        <Rule>
          <Name>due to water deficits irrigation to eliminate any stress</Name>
          <Title>due to water deficits irrigation to eliminate any stress</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>irrigation</ogc:PropertyName> <ogc:Literal><![CDATA[3]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#004DA8</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>regular irrigation  although periods of water deficit several times per year</Name>
          <Title>regular irrigation  although periods of water deficit several times per year</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>irrigation</ogc:PropertyName> <ogc:Literal><![CDATA[2]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#0070FF</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>occasional irrigation to maintain minimal plant growth in periods of deficit</Name>
          <Title>occasional irrigation to maintain minimal plant growth in periods of deficit</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>irrigation</ogc:PropertyName> <ogc:Literal><![CDATA[1]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#BED2FF</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>none</Name>
          <Title>none</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>irrigation</ogc:PropertyName> <ogc:Literal><![CDATA[0]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#FFFF00</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>