<!--SLD file created with GeoCat Bridge premium v1.1.0 using ArcGIS Desktop with Geoserver extensions.
 Date: 07 November 2012
 See www.geocat.net for more details-->
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
  version="1.0.0">
  <NamedLayer>
    <Name>cultivar_type_legend</Name>
    <UserStyle>
      <Name>cultivar_type_legend_style</Name>
      <Title>prod sys legend style</Title>
	  
	    <FeatureTypeStyle>
        <Rule>
          <Name>Cavendish</Name>
          <Title>Cavendish</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>cultivar_type</ogc:PropertyName> <ogc:Literal><![CDATA[1]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter>
		  <PolygonSymbolizer><Fill><CssParameter
                name="fill">#FF0000</CssParameter></Fill></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Plantain</Name>
          <Title>Plantain</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>cultivar_type</ogc:PropertyName> <ogc:Literal><![CDATA[2]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#FF0000</CssParameter></Fill></PolygonSymbolizer></Rule>
        <Rule>
          <Name>East African Highland</Name>
          <Title>East African Highland</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>cultivar_type</ogc:PropertyName> <ogc:Literal><![CDATA[3]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#55FF00</CssParameter></Fill></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Gros Michel</Name>
          <Title>Gros Michel</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>cultivar_type</ogc:PropertyName> <ogc:Literal><![CDATA[4]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#55FF00</CssParameter></Fill></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Sabah types (bluggoe types, pisang awak, yangambi)</Name>
          <Title>Sabah types (bluggoe types, pisang awak, yangambi)</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>cultivar_type</ogc:PropertyName> <ogc:Literal><![CDATA[5]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#55FF00</CssParameter></Fill></PolygonSymbolizer></Rule>
        <Rule>
          <Name>6 AAB dessert type</Name>
          <Title>6 AAB dessert type</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>cultivar_type</ogc:PropertyName> <ogc:Literal><![CDATA[6]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#FFFF00</CssParameter></Fill></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Diploid type</Name>
          <Title>Diploid type</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>cultivar_type</ogc:PropertyName> <ogc:Literal><![CDATA[7]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#FF3300</CssParameter></Fill></PolygonSymbolizer></Rule>
      </FeatureTypeStyle>
	  
      <FeatureTypeStyle>
        <Rule>
          <Name>Associated with established perennial crops</Name>
          <Title>Associated with established perennial crops</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>association</ogc:PropertyName> <ogc:Literal><![CDATA[1]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>circle</WellKnownName><Fill><CssParameter
                name="fill">#000000</CssParameter></Fill></Mark><Opacity>1</Opacity><Size>2</Size><Rotation>0</Rotation></Graphic></GraphicFill></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">1</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Perennial Musa planting mixed with annual crops</Name>
          <Title>Perennial Musa planting mixed with annual crops</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>association</ogc:PropertyName> <ogc:Literal><![CDATA[2]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://vertline</WellKnownName><Fill><CssParameter
                name="fill">#000000</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#000000</CssParameter><CssParameter
                name="stroke-width">1</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>10</Size></Graphic></GraphicFill></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">1</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Annual food crop association intercropped with Musa (2-5 years)</Name>
          <Title>Annual food crop association intercropped with Musa (2-5 years)</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>association</ogc:PropertyName> <ogc:Literal><![CDATA[3]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://vertline</WellKnownName><Fill><CssParameter
                        name="fill">#000000</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#000000</CssParameter><CssParameter
                        name="stroke-width">1</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>10</Size></Graphic></GraphicFill></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">1</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Musa field (2-5 years) with short term annual crop intercropped during Musa establishment</Name>
          <Title>Musa field (2-5 years) with short term annual crop intercropped during Musa establishment</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>association</ogc:PropertyName> <ogc:Literal><![CDATA[4]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://horline</WellKnownName><Fill><CssParameter
                        name="fill">#000000</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#000000</CssParameter><CssParameter
                        name="stroke-width">1</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>10</Size></Graphic></GraphicFill></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">1</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Perennial Musa monocrop</Name>
          <Title>Perennial Musa monocrop</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>association</ogc:PropertyName> <ogc:Literal><![CDATA[5]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">1</CssParameter></Stroke></PolygonSymbolizer><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://slash</WellKnownName><Fill><CssParameter
                        name="fill">#000000</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#000000</CssParameter><CssParameter
                        name="stroke-width">0.5</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>10</Size></Graphic></GraphicFill></Fill><Stroke><CssParameter
                name="stroke">#000000</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Frequently replanted Musa monocrop</Name>
          <Title>Frequently replanted Musa monocrop</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>association</ogc:PropertyName> 
          <ogc:Literal><![CDATA[6]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter>
          <PolygonSymbolizer><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>circle</WellKnownName><Fill><CssParameter
                        name="fill">#000000</CssParameter></Fill></Mark><Opacity>1</Opacity><Size>2</Size><Rotation>0</Rotation></Graphic></GraphicFill></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">1</CssParameter></Stroke></PolygonSymbolizer></Rule>
       
      </FeatureTypeStyle>
	  

      
      
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
