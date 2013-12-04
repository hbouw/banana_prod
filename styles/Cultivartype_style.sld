<!--SLD file created with GeoCat Bridge premium v1.1.0 using ArcGIS Desktop with Geoserver extensions.
 Date: 14 november 2012
 See www.geocat.net for more details-->
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
  version="1.0.0">
  <NamedLayer>
    <Name>cultivar_typeype</Name>
    <UserStyle>
      <Name>Cultivartype_style</Name>
      <Title>Cultivartype style</Title>
      <FeatureTypeStyle>
        <Rule>
          <Name>Diploid Type</Name>
          <Title>Diploid Type</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>cultivar_type</ogc:PropertyName> <ogc:Literal><![CDATA[7]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#FFAA00</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>AAB dessert type</Name>
          <Title>AAB dessert type</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>cultivar_type</ogc:PropertyName> <ogc:Literal><![CDATA[6]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#53C22F</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Sabah types (bluggoe types, pisang awak, yangambi</Name>
          <Title>Sabah types (bluggoe types, pisang awak, yangambi</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>cultivar_type</ogc:PropertyName> <ogc:Literal><![CDATA[5]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#FF0000</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Gros Michel</Name>
          <Title>Gros Michel</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>cultivar_type</ogc:PropertyName> <ogc:Literal><![CDATA[4]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#BA3CA9</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>East African Highland</Name>
          <Title>East African Highland</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>cultivar_type</ogc:PropertyName> <ogc:Literal><![CDATA[3]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#005CE6</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Plantain</Name>
          <Title>Plantain</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>cultivar_type</ogc:PropertyName> <ogc:Literal><![CDATA[2]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#9C4E21</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Cavendish</Name>
          <Title>Cavendish</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>cultivar_type</ogc:PropertyName> <ogc:Literal><![CDATA[1]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#FFFF00</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>