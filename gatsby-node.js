const path = require(`path`)

const fetch = require("node-fetch")

const HOSTNAME = process.env.GATSBY_API_HOST
const CANDIDATE_NODE_TYPE = `Candidate`
const ELECTION_NODE_TYPE = `Election`
const METADATA_NODE_TYPE = `Metadata`
const OFFICE_ELECTION_NODE_TYPE = `OfficeElection`
const REFERENDUM_NODE_TYPE = `Referendum`
const DEFAULT_ELECTION_TARGET = "6/7/2022"

async function fetchEndpoint(endpoint) {
  const response = await fetch(
    `http://${HOSTNAME}/open-disclosure/api/v1.0/${endpoint}`
  )
  if (response.ok) {
    return await response.json()
  }
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  const electionData = JSON.parse("{\"Elections\":{\"6\\/7\\/2022\":{\"Title\":\"2022 Election Cycle\",\"Date\":\"6\\/7\\/2022\",\"TotalContributions\":4730943.8100000005,\"FundingByGeo\":{\"SJ\":3969467.0699999998,\"NonSJ\":6436806.71,\"CA\":8424453.7100000009,\"NonCA\":1981820.0700000001},\"OfficeElections\":[{\"Title\":\"Councilmember District 1\",\"CandidateIDs\":[\"10\",\"17\",\"20\"],\"TotalContributions\":146263.94},{\"Title\":\"Councilmember District 3\",\"CandidateIDs\":[\"7\",\"5\",\"14\",\"9\"],\"TotalContributions\":259293.20000000001},{\"Title\":\"Councilmember District 5\",\"CandidateIDs\":[\"16\",\"19\",\"13\",\"6\",\"1\"],\"TotalContributions\":204142.85999999999},{\"Title\":\"Councilmember District 7\",\"CandidateIDs\":[\"12\",\"21\",\"2\"],\"TotalContributions\":629021.90000000002},{\"Title\":\"Councilmember District 9\",\"CandidateIDs\":[\"15\"],\"TotalContributions\":54732},{\"Title\":\"General Purpose\",\"CandidateIDs\":[],\"TotalContributions\":1776156.5800000001},{\"Title\":\"Mayor\",\"CandidateIDs\":[\"18\",\"4\",\"3\",\"11\",\"8\"],\"TotalContributions\":1623959.7}],\"Referendums\":[]}},\"Metadata\":\"2022-05-18 00:34:07.925070\"}")
  const candidateData = JSON.parse("{\"Candidates\":[{\"ID\":\"10\",\"Name\":\"Justin Lardinois\",\"TotalRCPT\":32826.419999999998,\"TotalEXPN\":57046.849999999999,\"TotalLOAN\":5000,\"TotalS497\":0,\"TotalFunding\":37826.419999999998,\"FundingByType\":{\"COM\":25013.580000000002,\"IND\":7551,\"OTH\":5261.8400000000001,\"IndependentSupport\":null,\"IndependentOppose\":null},\"FundingByGeo\":{\"SJ\":33148.040000000001,\"NonSJ\":4678.3800000000001,\"CA\":37546.419999999998,\"NonCA\":280},\"ExpenditureByType\":{\"CMP\":2163.1100000000001,\"FIL\":100,\"FND\":4440.3699999999999,\"LIT\":87.5,\"MON\":500,\"OFC\":23623.779999999999,\"POL\":4500,\"POS\":23.030000000000001,\"PRO\":11238.32,\"PRT\":71.010000000000005,\"RFD\":3300,\"SAL\":5559.54,\"WEB\":689.70000000000005},\"Committees\":[{\"Name\":\"IBEW Local 332 Education Fund\",\"TotalFunding\":25000},{\"Name\":\"San Jose\\/Evergreen Faculty Association  AFT 6157 COPE\",\"TotalFunding\":13.58}]},{\"ID\":\"17\",\"Name\":\"Ramona Snyder\",\"TotalRCPT\":28378,\"TotalEXPN\":20113.509999999998,\"TotalLOAN\":10000,\"TotalS497\":0,\"TotalFunding\":38378,\"FundingByType\":{\"IND\":36978,\"OTH\":1400,\"IndependentSupport\":null,\"IndependentOppose\":null},\"FundingByGeo\":{\"SJ\":30004,\"NonSJ\":8374,\"CA\":38053,\"NonCA\":325},\"ExpenditureByType\":{\"CMP\":2978.6599999999999,\"CTB\":150,\"FIL\":3225,\"FND\":11.91,\"LIT\":6700.8599999999997,\"MON\":150,\"MTG\":50,\"POS\":82.799999999999997,\"PRO\":2500,\"PRT\":2752,\"TSF\":284.30000000000001,\"WEB\":1227.98},\"Committees\":[]},{\"ID\":\"20\",\"Name\":\"Rosemary Kamei\",\"TotalRCPT\":60059.519999999997,\"TotalEXPN\":13628.76,\"TotalLOAN\":10000,\"TotalS497\":0,\"TotalFunding\":70059.51999999999,\"FundingByType\":{\"COM\":8950,\"IND\":58709.519999999997,\"OTH\":2400,\"IndependentSupport\":14195.719999999999,\"IndependentOppose\":null},\"FundingByGeo\":{\"SJ\":36549.519999999997,\"NonSJ\":33510,\"CA\":69434.520000000004,\"NonCA\":625},\"ExpenditureByType\":{\"CMP\":2956.4099999999999,\"FIL\":3025,\"LIT\":3935.5,\"OFC\":38.25,\"SAL\":1900,\"WEB\":1773.5999999999999},\"Committees\":[{\"Name\":\"Bricklayers & Allied Craftworkers Local No. 3 PAC\",\"TotalFunding\":250},{\"Name\":\"Build Jobs PAC\",\"TotalFunding\":700},{\"Name\":\"California Apartment Association PAC\",\"TotalFunding\":700},{\"Name\":\"Dave Cortese for Senate 2024\",\"TotalFunding\":500},{\"Name\":\"Democratic Activists for Women Now\",\"TotalFunding\":700},{\"Name\":\"IBEW 332 Education Fund\\/All Purpose Acct\",\"TotalFunding\":700},{\"Name\":\"IFPTE Local 21\",\"TotalFunding\":700},{\"Name\":\"Marc Berman for Assembly 2022\",\"TotalFunding\":700},{\"Name\":\"Operating Engineers Local 3 District 90\",\"TotalFunding\":700},{\"Name\":\"Plumbers Steamfitters & Refrigeration Fitters, Local 393 Political Action Fund\",\"TotalFunding\":700},{\"Name\":\"ReElect Margaret Abe Koga\",\"TotalFunding\":500},{\"Name\":\"Santa Clara & San Benito Counties Building & Construction Trades Council PAC\",\"TotalFunding\":700},{\"Name\":\"Santa Clara County League of Conservation Voters\",\"TotalFunding\":700},{\"Name\":\"Sheet Metal Workers Local Union 104 Political Committee\",\"TotalFunding\":700}]},{\"ID\":\"7\",\"Name\":\"Irene Smith\",\"TotalRCPT\":82989,\"TotalEXPN\":54026.279999999999,\"TotalLOAN\":10000,\"TotalS497\":0,\"TotalFunding\":92989,\"FundingByType\":{\"COM\":1400,\"IND\":89489,\"OTH\":2100,\"IndependentSupport\":700,\"IndependentOppose\":null},\"FundingByGeo\":{\"SJ\":60492,\"NonSJ\":32497,\"CA\":89589,\"NonCA\":3400},\"ExpenditureByType\":{\"CMP\":4530.1999999999998,\"CNS\":7500,\"FIL\":2975,\"LIT\":16619.290000000001,\"OFC\":54.07,\"POL\":3000,\"POS\":10.220000000000001,\"PRO\":4610.1800000000003,\"SAL\":14000,\"WEB\":727.32000000000005},\"Committees\":[{\"Name\":\"California Apartment Association PAC\",\"TotalFunding\":700},{\"Name\":\"Silicon Valley Biz PAC\",\"TotalFunding\":700}]},{\"ID\":\"5\",\"Name\":\"Elizabeth Chien-Hale\",\"TotalRCPT\":12716,\"TotalEXPN\":5278,\"TotalLOAN\":10500,\"TotalS497\":10000,\"TotalFunding\":23216,\"FundingByType\":{\"IND\":22716,\"OTH\":500,\"IndependentSupport\":null,\"IndependentOppose\":null},\"FundingByGeo\":{\"SJ\":15020,\"NonSJ\":8196,\"CA\":22396,\"NonCA\":820},\"ExpenditureByType\":{\"CMP\":1600,\"CNS\":1000,\"IKD\":126,\"MBR\":120,\"POS\":310,\"WEB\":2122},\"Committees\":[]},{\"ID\":\"14\",\"Name\":\"Omar Torres\",\"TotalRCPT\":58238.199999999997,\"TotalEXPN\":28883.279999999999,\"TotalLOAN\":0,\"TotalS497\":0,\"TotalFunding\":58238.199999999997,\"FundingByType\":{\"COM\":8650,\"IND\":44819.220000000001,\"OTH\":4768.9799999999996,\"IndependentSupport\":13006.98,\"IndependentOppose\":null},\"FundingByGeo\":{\"SJ\":36447.220000000001,\"NonSJ\":21790.98,\"CA\":57484.220000000001,\"NonCA\":753.98000000000002},\"ExpenditureByType\":{\"CMP\":164.06,\"CNS\":500,\"FIL\":3115,\"FND\":793.76999999999998,\"LIT\":5081.1800000000003,\"MON\":100,\"MTG\":431.97000000000003,\"OFC\":2358.77,\"PRO\":4770,\"SAL\":10226.75,\"WEB\":1341.78},\"Committees\":[{\"Name\":\"IBEW 332 Education Fund (Sponsored by International Brotherhood of Electrical Workers Local 332)\",\"TotalFunding\":700},{\"Name\":\"Laborers Local 220 Political Action Committee\",\"TotalFunding\":700},{\"Name\":\"Laborers Local 67 Political Action Committee\",\"TotalFunding\":700},{\"Name\":\"Laborers Local Union 270 Political Action Committee\",\"TotalFunding\":700},{\"Name\":\"Laborers' Local 304\",\"TotalFunding\":700},{\"Name\":\"Plumbers, Steamfitters & Refigeration Fitters Local 393 Political Action Fund\",\"TotalFunding\":700},{\"Name\":\"Robert Garcia for Lt Governor 2026\",\"TotalFunding\":700},{\"Name\":\"San Francisco Laborer's Local 261\",\"TotalFunding\":700},{\"Name\":\"Santa Clara & San Benito Counties Building & Construction Trades Council PAC\",\"TotalFunding\":700},{\"Name\":\"Santa Clara County League of Conservation Voters\",\"TotalFunding\":700},{\"Name\":\"Santa Clara County Probation Peace Officers' Union Political Account\",\"TotalFunding\":700},{\"Name\":\"Seiu Local 2007 Higher Education Workers\",\"TotalFunding\":250},{\"Name\":\"Sheet Metal Workers Local Union 104 Political Committee\",\"TotalFunding\":700}]},{\"ID\":\"9\",\"Name\":\"Joanna Rauh\",\"TotalRCPT\":64850,\"TotalEXPN\":14339.02,\"TotalLOAN\":20000,\"TotalS497\":40000,\"TotalFunding\":84850,\"FundingByType\":{\"COM\":1400,\"IND\":80050,\"OTH\":3400,\"IndependentSupport\":null,\"IndependentOppose\":null},\"FundingByGeo\":{\"SJ\":63500,\"NonSJ\":21350,\"CA\":84150,\"NonCA\":700},\"ExpenditureByType\":{\"CMP\":4531.6000000000004,\"CNS\":1748.97,\"LIT\":2962.98,\"MTG\":2100,\"OFC\":2720.0799999999999,\"PRO\":275.38999999999999},\"Committees\":[{\"Name\":\"California Apartment Association Political Action Committee\",\"TotalFunding\":700},{\"Name\":\"Santa Clara County League of Conservation Voters\",\"TotalFunding\":700}]},{\"ID\":\"16\",\"Name\":\"Peter Ortiz\",\"TotalRCPT\":17901,\"TotalEXPN\":20626.360000000001,\"TotalLOAN\":3036,\"TotalS497\":0,\"TotalFunding\":20937,\"FundingByType\":{\"COM\":6550,\"IND\":14287,\"OTH\":100,\"IndependentSupport\":9583.8400000000001,\"IndependentOppose\":null},\"FundingByGeo\":{\"SJ\":11966,\"NonSJ\":8971,\"CA\":20787,\"NonCA\":150},\"ExpenditureByType\":{\"CNS\":5000,\"CVC\":514.52999999999997,\"FIL\":250,\"LIT\":3792.98,\"OFC\":2002.6199999999999,\"PRO\":7162.1999999999998,\"TRC\":12,\"WEB\":1889.28},\"Committees\":[{\"Name\":\"Laborers International Union of North America-Local 89\",\"TotalFunding\":700},{\"Name\":\"Laborers Local 220 Political Action Committee\",\"TotalFunding\":700},{\"Name\":\"Laborers Local 67 PAC\",\"TotalFunding\":700},{\"Name\":\"Laborers' Local 300 Small Contibutor Committee\",\"TotalFunding\":700},{\"Name\":\"Laborers' Local 304 Pac Account\",\"TotalFunding\":700},{\"Name\":\"Laborers' Local 73 PAC Fund\",\"TotalFunding\":700},{\"Name\":\"Santa Clara & San Benito Counties Building & Construction Trades Council PAC\",\"TotalFunding\":700},{\"Name\":\"Santa Clara County League of Conservation Voter\",\"TotalFunding\":700},{\"Name\":\"Seiu Local 2007 Higher Education Workers\",\"TotalFunding\":250},{\"Name\":\"South Bay Progressive Alliance Corporate Free PAC\",\"TotalFunding\":700}]},{\"ID\":\"19\",\"Name\":\"Rolando Bonilla\",\"TotalRCPT\":50569.989999999998,\"TotalEXPN\":49596.599999999999,\"TotalLOAN\":0,\"TotalS497\":0,\"TotalFunding\":50569.989999999998,\"FundingByType\":{\"COM\":250,\"IND\":43369.989999999998,\"OTH\":6950,\"IndependentSupport\":700,\"IndependentOppose\":null},\"FundingByGeo\":{\"SJ\":15075,\"NonSJ\":35494.989999999998,\"CA\":44169.989999999998,\"NonCA\":6400},\"ExpenditureByType\":{\"CNS\":15000,\"FIL\":50,\"FND\":4118.46,\"LIT\":4928.1400000000003,\"POL\":20000,\"PRO\":5500},\"Committees\":[{\"Name\":\"King for County School Board 2018\",\"TotalFunding\":250}]},{\"ID\":\"13\",\"Name\":\"Nora Campos\",\"TotalRCPT\":65601,\"TotalEXPN\":9279.7900000000009,\"TotalLOAN\":0,\"TotalS497\":0,\"TotalFunding\":65601,\"FundingByType\":{\"IND\":64901,\"OTH\":700,\"IndependentSupport\":9583.8400000000001,\"IndependentOppose\":null},\"FundingByGeo\":{\"SJ\":31326,\"NonSJ\":34275,\"CA\":63001,\"NonCA\":2600},\"ExpenditureByType\":{\"CMP\":437.05000000000001,\"FIL\":2900,\"FND\":2066.5799999999999,\"LIT\":735,\"OFC\":292.74000000000001,\"POS\":59.369999999999997,\"PRO\":1797.05,\"WEB\":992},\"Committees\":[]},{\"ID\":\"6\",\"Name\":\"HG Nguyen\",\"TotalRCPT\":9736,\"TotalEXPN\":6060.6700000000001,\"TotalLOAN\":1428.8699999999999,\"TotalS497\":0,\"TotalFunding\":11164.869999999999,\"FundingByType\":{\"IND\":10864.870000000001,\"OTH\":300,\"IndependentSupport\":null,\"IndependentOppose\":null},\"FundingByGeo\":{\"SJ\":9405.8700000000008,\"NonSJ\":1759,\"CA\":11164.870000000001,\"NonCA\":0},\"ExpenditureByType\":{\"CMP\":2661.0599999999999,\"FND\":1400,\"OFC\":480.61000000000001,\"POS\":116,\"PRO\":338,\"PRT\":690,\"WEB\":375},\"Committees\":[]},{\"ID\":\"1\",\"Name\":\"Andres Quintero\",\"TotalRCPT\":35870," + 
      "\"TotalEXPN\":8473.7600000000002,\"TotalLOAN\":20000,\"TotalS497\":0,\"TotalFunding\":55870,\"FundingByType\":{\"COM\":1400,\"IND\":51670,\"OTH\":1400,\"SCC\":1400,\"IndependentSupport\":null,\"IndependentOppose\":null},\"FundingByGeo\":{\"SJ\":39854,\"NonSJ\":16016,\"CA\":55820,\"NonCA\":50},\"ExpenditureByType\":{\"FIL\":2925,\"FND\":145.72999999999999,\"PRT\":1287.6300000000001,\"WEB\":3755.4000000000001},\"Committees\":[{\"Name\":\"IBEW 332 Educcation Fund\\/All Purpose Acct\",\"TotalFunding\":700},{\"Name\":\"Marc Berman for Assembly 2022\",\"TotalFunding\":700}]},{\"ID\":\"12\",\"Name\":\"Maya Esparza\",\"TotalRCPT\":93757.419999999998,\"TotalEXPN\":46469.860000000001,\"TotalLOAN\":0,\"TotalS497\":0,\"TotalFunding\":93757.419999999998,\"FundingByType\":{\"COM\":14111.690000000001,\"IND\":62401,\"OTH\":15144.73,\"SCC\":2100,\"IndependentSupport\":110495.39999999999,\"IndependentOppose\":null},\"FundingByGeo\":{\"SJ\":46168.690000000002,\"NonSJ\":47588.730000000003,\"CA\":88545.690000000002,\"NonCA\":5211.7299999999996},\"ExpenditureByType\":{\"CMP\":4187.3800000000001,\"FIL\":2975,\"FND\":306.02999999999997,\"LIT\":22500.990000000002,\"OFC\":1918.0799999999999,\"PRO\":2457.3200000000002,\"RFD\":50,\"WEB\":277.67000000000002},\"Committees\":[{\"Name\":\"Bricklayers and Allied Craftworkers Local No. 3\",\"TotalFunding\":250},{\"Name\":\"Cement Mason's Local 400 PAC\",\"TotalFunding\":700},{\"Name\":\"Democratic Activists for Women Now\",\"TotalFunding\":700},{\"Name\":\"IBEW 332 Education Fund\",\"TotalFunding\":700},{\"Name\":\"IBEW PAC Local Union No. 11\",\"TotalFunding\":700},{\"Name\":\"IFPTE Local 21 TJ Anthony PAC Fund\",\"TotalFunding\":700},{\"Name\":\"IUPAT Political Action Together Legislative Education Committee - DC16\",\"TotalFunding\":700},{\"Name\":\"Laborers Local Union 270 PAC\",\"TotalFunding\":700},{\"Name\":\"Miller for Hospital District 2012\",\"TotalFunding\":125},{\"Name\":\"Operating Engineers Local Union No. 3 District 90 PAC\",\"TotalFunding\":700},{\"Name\":\"Plumbers, Steamfitters, Refrigeration Fitters, Local 393 Political Action Fund\",\"TotalFunding\":700},{\"Name\":\"SCC Probation Peace Officers' Union AFSCME Local 1587\",\"TotalFunding\":500},{\"Name\":\"SEIU Local 521 Candidate PAC\",\"TotalFunding\":700},{\"Name\":\"SEIU United Healthcare Workers West PAC\",\"TotalFunding\":500},{\"Name\":\"San Jose Firefighters, Local 230 PAC\",\"TotalFunding\":700},{\"Name\":\"Santa Clara & San Benito Counties Building & Construction Trades Council PAC\",\"TotalFunding\":700},{\"Name\":\"Santa Clara County Employee Management Association\",\"TotalFunding\":700},{\"Name\":\"Santa Clara County League of Conservation Voters\",\"TotalFunding\":700},{\"Name\":\"Sheet Metal Workers' International Association Local No. 104 PAC\",\"TotalFunding\":700},{\"Name\":\"South Bay AFL-CIO Labor Council\",\"TotalFunding\":686.69000000000005},{\"Name\":\"Teamsters Local Union No. 350\",\"TotalFunding\":700},{\"Name\":\"The California Women's List\",\"TotalFunding\":250},{\"Name\":\"United Food & Commercial Workers Local 5 PAC\",\"TotalFunding\":600}]},{\"ID\":\"21\",\"Name\":\"Van Le\",\"TotalRCPT\":95356.5,\"TotalEXPN\":35007.449999999997,\"TotalLOAN\":20000,\"TotalS497\":0,\"TotalFunding\":115356.5,\"FundingByType\":{\"IND\":114219,\"OTH\":1137.5,\"IndependentSupport\":null,\"IndependentOppose\":null},\"FundingByGeo\":{\"SJ\":90,\"NonSJ\":115266.5,\"CA\":114882.5,\"NonCA\":474},\"ExpenditureByType\":{\"CMP\":589.5,\"FIL\":3025,\"FND\":14568.969999999999,\"LIT\":2428.1300000000001,\"OFC\":4988.1400000000003,\"PRT\":1419.0799999999999,\"RAD\":3150,\"VOT\":3400,\"WEB\":1438.6300000000001},\"Committees\":[]},{\"ID\":\"2\",\"Name\":\"Bien Doan\",\"TotalRCPT\":58965,\"TotalEXPN\":25831.459999999999,\"TotalLOAN\":20000,\"TotalS497\":0,\"TotalFunding\":78965,\"FundingByType\":{\"IND\":74565,\"OTH\":4400,\"IndependentSupport\":700,\"IndependentOppose\":null},\"FundingByGeo\":{\"SJ\":56665,\"NonSJ\":22300,\"CA\":77920,\"NonCA\":1045},\"ExpenditureByType\":{\"CMP\":853.15999999999997,\"CNS\":571.42999999999995,\"FIL\":2975,\"FND\":19268.82,\"LIT\":1000,\"OFC\":154.93000000000001,\"POS\":28.719999999999999,\"PRO\":375.39999999999998,\"VOT\":348,\"WEB\":256},\"Committees\":[]},{\"ID\":\"15\",\"Name\":\"Pam Foley\",\"TotalRCPT\":53732,\"TotalEXPN\":12066.719999999999,\"TotalLOAN\":1000,\"TotalS497\":0,\"TotalFunding\":54732,\"FundingByType\":{\"COM\":2100,\"IND\":47232,\"OTH\":5400,\"IndependentSupport\":700,\"IndependentOppose\":null},\"FundingByGeo\":{\"SJ\":30005,\"NonSJ\":24727,\"CA\":52082,\"NonCA\":2650},\"ExpenditureByType\":{\"CMP\":50,\"CNS\":7856.1999999999998,\"FIL\":3075,\"OFC\":1085.52},\"Committees\":[{\"Name\":\"Build Jobs PAC\",\"TotalFunding\":700},{\"Name\":\"California Apartment Association PAC #745208\",\"TotalFunding\":700},{\"Name\":\"Silicon Valley Biz PAC\",\"TotalFunding\":700}]},{\"ID\":\"18\",\"Name\":\"Raul Peralez\",\"TotalRCPT\":119191,\"TotalEXPN\":173950.73999999999,\"TotalLOAN\":5500,\"TotalS497\":1400,\"TotalFunding\":124691,\"FundingByType\":{\"COM\":950,\"IND\":111491,\"OTH\":12250,\"IndependentSupport\":null,\"IndependentOppose\":null},\"FundingByGeo\":{\"SJ\":62009,\"NonSJ\":62682,\"CA\":118927,\"NonCA\":5764},\"ExpenditureByType\":{\"CMP\":531.5,\"CNS\":15000,\"FIL\":8850,\"FND\":33774.239999999998,\"MTG\":454.44999999999999,\"OFC\":2050.1100000000001,\"POL\":34000,\"POS\":548.85000000000002,\"PRO\":16926.93,\"SAL\":21013.75,\"WEB\":18881.77},\"Committees\":[{\"Name\":\"Build Jobs PAC\",\"TotalFunding\":700},{\"Name\":\"HNTB Holdings Inc PAC(FEC ID#C00386029)\",\"TotalFunding\":250}]},{\"ID\":\"4\",\"Name\":\"Dev Davis\",\"TotalRCPT\":274351,\"TotalEXPN\":156534.57000000001,\"TotalLOAN\":20000,\"TotalS497\":4200,\"TotalFunding\":294351,\"FundingByType\":{\"COM\":5850,\"IND\":248751,\"OTH\":39750,\"IndependentSupport\":2600,\"IndependentOppose\":null},\"FundingByGeo\":{\"SJ\":5030,\"NonSJ\":289321,\"CA\":283007,\"NonCA\":11344},\"ExpenditureByType\":{\"CMP\":20195.41,\"CVC\":1100,\"FIL\":8975,\"LIT\":14239.190000000001,\"MTG\":20,\"OFC\":24103.73,\"PHO\":8304.7700000000004,\"POL\":29000,\"POS\":69.010000000000005,\"PRO\":32580,\"RFD\":250,\"TEL\":2000,\"WEB\":15697.459999999999},\"Committees\":[{\"Name\":\"Associated Builders and Contractors Northern CA Chapter\",\"TotalFunding\":1400},{\"Name\":\"Build Jobs PAC\",\"TotalFunding\":1400},{\"Name\":\"California Apartment Association PAC\",\"TotalFunding\":1400},{\"Name\":\"HNTB Holdings Ltd. PAC\",\"TotalFunding\":250},{\"Name\":\"Silicon Valley Biz PAC\",\"TotalFunding\":1400}]},{\"ID\":\"3\",\"Name\":\"Cindy Chavez\",\"TotalRCPT\":375529,\"TotalEXPN\":290588.90999999997,\"TotalLOAN\":14500,\"TotalS497\":1400,\"TotalFunding\":390029,\"FundingByType\":{\"COM\":27850,\"IND\":299679,\"OTH\":55200,\"SCC\":7300,\"IndependentSupport\":62825.269999999997,\"IndependentOppose\":null},\"FundingByGeo\":{\"SJ\":156931,\"NonSJ\":233098,\"CA\":372503,\"NonCA\":17526},\"ExpenditureByType\":{\"CMP\":1093,\"CNS\":66666,\"CVC\":5867.5600000000004,\"FIL\":8850,\"FND\":6763.1700000000001,\"LIT\":17125.330000000002,\"MON\":200,\"MTG\":769.60000000000002,\"OFC\":44443.459999999999,\"POL\":61094.239999999998,\"POS\":1233.72,\"PRO\":7321.3500000000004,\"PRT\":6400,\"RAD\":7600,\"SAL\":33651.82,\"TEL\":4500,\"WEB\":2386.9899999999998},\"Committees\":[{\"Name\":\"Amalgamated Transit Union Local 265 PAC\",\"TotalFunding\":1000},{\"Name\":\"Build Jobs PAC\",\"TotalFunding\":700},{\"Name\":\"California Teamsters Public Affairs Council\",\"TotalFunding\":1400},{\"Name\":\"Cement Mason's Local 400 PAC\",\"TotalFunding\":1000},{\"Name\":\"Democratic Activists for Women Now\",\"TotalFunding\":1400},{\"Name\":\"Engineers & Scientists of California Local 20, IFPTE Lou Lucivero Legislative Education & Action Program (LEAP),\",\"TotalFunding\":1400},{\"Name\":\"IBEW 332 Education Fund Sponsored by International Brotherhood of Elecritical Workers 332\",\"TotalFunding\":700},{\"Name\":\"International Federation of Professional and Technical Engineers - Local 21 TJ Anthony PAC Fund\",\"TotalFunding\":1400},{\"Name\":\"Local 770, United Food and Commercial Workers (UFCW) PAC\",\"TotalFunding\":1400},{\"Name\":\"Lorena Gonzalez for Assembly 2022\",\"TotalFunding\":1400},{\"Name\":\"Margaret Abe Koga for Mountain View City Council 2016\",\"TotalFunding\":900},{\"Name\":\"Maria Elena Durazo Democrat for State Senate 2022\",\"TotalFunding\":1400},{\"Name\":\"Operating Engineers Local No. 3 District 90 PAC\",\"TotalFunding\":1400},{\"Name\":\"Phil Ting for Assembly 2022\",\"TotalFunding\":1400},{\"Name\":\"Robert Rivas for Assembly 2022\",\"TotalFunding\":1400},{\"Name\":\"Santa Clara & San Benito Counties Building & Construction Trades Council PAC\",\"TotalFunding\":1400},{\"Name\":\"Santa Clara County Correctional Peace Officers' Association PAC\",\"TotalFunding\":300},{\"Name\":\"Santa Clara County Firefighters Local 1165 PAC\",\"TotalFunding\":1000},{\"Name\":\"Santa Clara County League of Conservation Voters\",\"TotalFunding\":1400},{\"Name\":\"Teamsters Local No. 853 PAC\",\"TotalFunding\":1000},{\"Name\":\"Teamsters Local Union 350 PAC\",\"TotalFunding\":1400},{\"Name\":\"The California Women's List\",\"TotalFunding\":250},{\"Name\":\"United Food & Commercial Workers Union (UFCW) Local 324 PAC\",\"TotalFunding\":1400},{\"Name\":\"Women's Political Committee\",\"TotalFunding\":1400}]},{\"ID\":\"11\",\"Name\":\"Matt Mahan\",\"TotalRCPT\":805358.69999999995,\"TotalEXPN\":336449.76000000001,\"TotalLOAN\":0,\"TotalS497\":1100,\"TotalFunding\":805358.69999999995,\"FundingByType\":{\"COM\":5850,\"IND\":736674.01000000001,\"OTH\":62834.690000000002,\"IndependentSupport\":2000,\"IndependentOppose\":null},\"FundingByGeo\":{\"SJ\":374039.08000000002,\"NonSJ\":431319.62,\"CA\":743095.73999999999,\"NonCA\":62262.959999999999},\"ExpenditureByType\":{\"CMP\":33527.919999999998,\"CNS\":127662.99000000001,\"FIL\":8875,\"FND\":7829.0200000000004,\"LIT\":19696.349999999999," + 
      "\"OFC\":9969.0900000000001,\"PHO\":1183.0699999999999,\"POL\":38000,\"POS\":2247.3800000000001,\"PRO\":29023.02,\"PRT\":3000,\"WEB\":292},\"Committees\":[{\"Name\":\"Associated Builders and Contractors CA Chapter PAC\",\"TotalFunding\":1400},{\"Name\":\"Build Jobs PAC\",\"TotalFunding\":1400},{\"Name\":\"California Apartment Association PAC\",\"TotalFunding\":1400},{\"Name\":\"HNTB Holdings Ltd. PAC\",\"TotalFunding\":250},{\"Name\":\"Silicon Valley Biz PAC\",\"TotalFunding\":1400}]},{\"ID\":\"8\",\"Name\":\"James Spence\",\"TotalRCPT\":0,\"TotalEXPN\":9163.4699999999993,\"TotalLOAN\":9530,\"TotalS497\":0,\"TotalFunding\":9530,\"FundingByType\":{\"IND\":9530,\"IndependentSupport\":null,\"IndependentOppose\":null},\"FundingByGeo\":{\"SJ\":9530,\"NonSJ\":0,\"CA\":9530,\"NonCA\":0},\"ExpenditureByType\":{\"CMP\":263.47000000000003,\"FIL\":8900},\"Committees\":[]}],\"Metadata\":\"2022-05-18 00:34:07.925070\"}")
  const referendumData = JSON.parse("{\"Referendums\":[]}")
  const metadata = JSON.parse("{\"DateProcessed\":\"2022-05-18 00:34:07.925070\"}")


  candidateData.Candidates.forEach(candidate => {
    createNode({
      ...candidate,
      TotalContributions: candidate.TotalFunding,
      id: createNodeId(`${CANDIDATE_NODE_TYPE}-${candidate.ID}`),
      parent: null,
      children: [],
      internal: {
        type: CANDIDATE_NODE_TYPE,
        content: JSON.stringify(candidate),
        contentDigest: createContentDigest(candidate),
      },
    })
  })
  referendumData.Referendums.map(referendum => {
    const { id, name } = referendum

    createNode({
      ...referendum,
      id: createNodeId(`${REFERENDUM_NODE_TYPE}-${id}`),
      ID: id,
      Name: name,
      parent: null,
      children: [],
      internal: {
        type: REFERENDUM_NODE_TYPE,
        content: JSON.stringify(referendum),
        contentDigest: createContentDigest(referendum),
      },
    })
    return id
  })
  const election = electionData.Elections[DEFAULT_ELECTION_TARGET]
  createNode({
    ...election,
    OfficeElections: election.OfficeElections.map(officeElection => {
      const id = createNodeId(
        `${OFFICE_ELECTION_NODE_TYPE}-${officeElection.Title}`
      )
      createNode({
        ...officeElection,
        id,
        parent: null,
        children: [],
        internal: {
          type: OFFICE_ELECTION_NODE_TYPE,
          content: JSON.stringify(officeElection),
          contentDigest: createContentDigest(officeElection),
        },
      })
      return id
    }),
    id: createNodeId(`${ELECTION_NODE_TYPE}-${election.Date}`),
    parent: null,
    children: [],
    internal: {
      type: ELECTION_NODE_TYPE,
      content: JSON.stringify(election),
      contentDigest: createContentDigest(election),
    },
  })
  createNode({
    ...metadata,
    id: createNodeId(`${METADATA_NODE_TYPE}`),
    parent: null,
    children: [],
    internal: {
      type: METADATA_NODE_TYPE,
      content: JSON.stringify(metadata),
      contentDigest: createContentDigest(metadata),
    },
  })
  return
}
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allElection {
        edges {
          node {
            Title
            Date
            TotalContributions
            OfficeElections {
              id
              Title
              TotalContributions
              fields {
                slug
              }
              Candidates {
                ID
                Name
                fields {
                  slug
                }
                jsonNode {
                  ballotDesignation
                  profilePhoto
                }
              }
            }
            Referendums {
              ID
              Name
              fields {
                slug
              }
            }
          }
        }
      }
    }
  `)
  result.data.allElection.edges.forEach(({ node }) => {
    node.OfficeElections &&
      node.OfficeElections.forEach(election => {
        createPage({
          path: `/${node.Date}/candidates/${election.fields.slug}`,
          component: path.resolve("src/templates/candidates.js"),
          context: {
            slug: election.fields.slug,
            officeElectionID: election.id,
            electionDate: node.Date,
          },
        })
        election.Candidates.forEach(candidate => {
          createPage({
            path: `/${node.Date}/candidate/${election.fields.slug}/${candidate.fields.slug}`,
            component: path.resolve("src/templates/candidate.js"),
            context: {
              slug: candidate.fields.slug,
              id: candidate.ID,
            },
          })
        })
      })
    node.Referendums &&
      node.Referendums.forEach(referendum => {
        createPage({
          path: `/${node.Date}/referendums/${referendum.fields.slug}`,
          component: path.resolve("src/templates/referendum.js"),
          context: {
            slug: referendum.fields.slug,
            id: referendum.ID,
          },
        })
      })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type NodeFields {
      slug: String
    }

    type Committee {
      Name: String
      TotalFunding: String
    }

    type GeoBreakdown {
      SJ: Float
      NonSJ: Float
      CA: Float
      NonCA: Float
    }

    type FundingTypeBreakdown {
      IND: Float
      COM: Float
      OTH: Float
      PTY: Float
      SCC: Float
      IndependentSupport: Float
      IndependentOppose: Float
    }

    type ExpenditureTypeBreakdown {
      SAL: Float
      CMP: Float
      CNS: Float
      CVC: Float
      FIL: Float
      FND: Float
      LIT: Float
      MBR: Float
      MTG: Float
      OFC: Float
      POL: Float
      POS: Float
      PRO: Float
      PRT: Float
      RAD: Float
      RFD: Float
      TEL: Float
      TRS: Float
      WEB: Float
    }

    type Candidate implements Node {
      id: ID!
      ID: String!
      Name: String!
      Committees: [Committee]
      TotalContributions: Float 
      TotalFunding: Float
      TotalEXPN: Float
      TotalLOAN: Float
      TotalRCPT: Float
      FundingByGeo: GeoBreakdown
      FundingByType: FundingTypeBreakdown
      ExpenditureByType: ExpenditureTypeBreakdown
      jsonNode: CandidatesJson @link(by: "id" from: "ID")
      fields: NodeFields
    }

    type CandidatesJson implements Node {
      id: ID!
      name: String!
      twitter: String
      seat: String
      ballotDesignation: String
      website: String
      votersEdge: String
      apiNode: Candidate @link(by: "ID" from: "id")
      profilePhoto: String
    }

    type Election implements Node {
      Title: String!
      Date: String 
      TotalContributions: Float 
      OfficeElections: [OfficeElection] @link
      Referendums: [Referendum] @link(by: "ID")
      fields: NodeFields
    }

    type OfficeElection implements Node {
      Candidates: [Candidate] @link(by: "ID" from: "CandidateIDs")
      Title: String
      TotalContributions: Float
      fields: NodeFields
    }

    type RefElectionCycle {
      Date: String
      ElectionCycle: String
    }

    type RefCommittee {
      Name: String
      TotalFunding: Float
    }

    type RefContributor {
      Name: String
      ContributionType: String
      Occupation: String
      Employer: String
      ZipCode: String
      Contributions: Float
      Date: String
    }

    type RefCampaign {
      TotalFunding: Float
      TotalEXPN: Float
      TotalLOAN: Float
      TotalRCPT: Float
      FundingByGeo: GeoBreakdown
      FundingByType: FundingTypeBreakdown
      ExpenditureByType: ExpenditureTypeBreakdown
      Committees: [RefCommittee]
      Contributors: [RefContributor]
    }

    type MeasuresJson implements Node {
      electionDate: String!
      name: String!
      description: String!
      ballotLanguage: String!
      href: String
    }

    type Referendum implements Node {
      id: ID
      ID: String
      Name: String!
      description: String
      ballotLanguage: String
      electionDate: String
      Election: RefElectionCycle
      TotalSupport: Float
      TotalOppose: Float
      Support: RefCampaign
      Opposition: RefCampaign
      jsonNode: MeasuresJson @link(by: "id" from: "ID")
      fields: NodeFields 
    }

    type Metadata implements Node{
      DateProcessed: String
    }
  `)
}
