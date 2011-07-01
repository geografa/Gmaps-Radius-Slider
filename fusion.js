function updateSchools() {
	updateQuery = "SELECT District FROM " + tableid + " WHERE ST_INTERSECTS(District, CIRCLE(LATLNG(" + marker.getPosition().lat() + "," + marker.getPosition().lng() + ")," + radius + "))";
	layer.setQuery(updateQuery);
}