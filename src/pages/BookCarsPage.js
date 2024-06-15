import { Box, GridItem, SimpleGrid, VStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Navbar from '../Components/navbar/Navbar';
import CarCard from "../Components/ui/car-card";
import Footer from "../Components/footer";
import LoadingSpinner from "../Components/ui/loading-spinner"; // Corrected import path
import SearchInput from "../Components/search";
import HomeSidebarContent from "../Components/home/home-sidebar-content";
import AvatarMenu from '../Components/navbar/avatar-menu';
import NavbarLinks from "../Components/navbar/NavbarLinks";
// import {SearchContext, SearchProvider} from "../SearchContext";
import {SearchContext} from "../SearchContext";
import  {SearchProvider} from "../SearchContext"; // Corrected import path

function BookCars() {
  const { searchResults, setSearchResults } = useContext(SearchContext);
  const [cars, setCars] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/cars").then((response) => {
      setCars(response.data.data);
      setLoading(false);
    });
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Box flexGrow={1}>
        <Navbar
          sidebarContent={<HomeSidebarContent />}
          links={<NavbarLinks />}
          buttons={
            <>
              <SearchInput type={"cars"} />
              <AvatarMenu />
            </>
          }
        />

        <VStack>
          <SimpleGrid
            columns={[1, 1, 2, 2, 3]}
            rowGap={6}
            columnGap={8}
            py={10}
          >
            {searchResults && searchResults.length > 0
              ? searchResults.map((car) => (
                  <GridItem key={car.id} colSpan={1}>
                    <CarCard props={car} />
                  </GridItem>
                ))
              : cars.map((car) => (
                  <GridItem key={car.id} colSpan={1}>
                    <CarCard props={car} />
                  </GridItem>
                ))}
          </SimpleGrid>
        </VStack>
      </Box>
      <Footer />
    </Box>
  );
}

export default BookCars;