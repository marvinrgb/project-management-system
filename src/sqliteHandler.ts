import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


let functions = {
  'getAllFromTable': getAllFromTable,
  'getOneWithID': getOneWithID,
  'createTrack': createTrack,
  'changeTrack': changeTrack,
  'deleteTrack': deleteTrack,
  'trackQuery': trackQuery,
  'tracksByProject': tracksByProject,
  'trackFullText': trackFullText,
  'createProject': createProject,

};
// export default functions;

//returns an Array
export async function getAllFromTable(tablename:string):Promise<any> {
  console.log(tablename)
  if (tablename === 'track') {
    let data = await prisma.track.findMany();
    return data;
  } else if (tablename === 'project') {
    let data = await prisma.project.findMany();
    return data;
  }
}

//returns an Object
export async function getOneWithID(tablename:string, id:number):Promise<any> {
  if (tablename === 'track') {
    let data = await prisma.track.findFirst({
      where: {
        id: id
      }
    });
    return data;
  } else if (tablename === 'project') {
    let data = await prisma.project.findFirst({
      where: {
        id: id
      }
    });
    return data;
  }
}

export async function createTrack(data:any) {
  let db_response = await prisma.track.create({
    data: data
  });
  return db_response
}

export async function changeTrack(data:any) {
  let db_response = await prisma.track.update({
    where: {
      id: data.id
    },
    data: data
  });
  return db_response  
}

export async function deleteTrack(id:number) {
  let db_response = await prisma.track.delete({
    where: {
      id: id
    }
  })
  return db_response
}

export async function trackQuery(data:any) {
  let db_response = await prisma.track.findMany({
    where: data
  })
  return db_response
}

export async function tracksByProject(id:number) {
  let db_response = await prisma.track.findMany({
    where: {
      projectId: id
    }
  })
  return db_response
}

export async function trackFullText(query:string) {
  let db_response = await prisma.track.findMany({
    where: {
      OR: [
        {
          id: returnNumIfNum(query)
        },
        {
          name: {
            contains: query
          }
        },
        {
          description: {
            contains: query
          }
        },
        {
          genre: {
            contains: query
          }
        },
        {
          text: {
            contains: query
          }
        }
      ]
    }
  })
  return db_response
}

function returnNumIfNum(text:any) {
  if (isNaN(text)) {
    return undefined
  } else {
    return parseInt(text)
  }
}

export async function createProject(data:any) {
  let db_response = await prisma.project.create({
    data: data
  })
  return db_response
}

export async function changeProject(data:any) {
  let db_response = await prisma.project.update({
    where: {
      id: data.id
    },
    data: data
  })
  return db_response
}

export async function deleteProject(id:number) {
  let db_response = prisma.project.delete({
    where: {
      id: id
    }
  })
  return db_response
}

export async function projectFullText(query:string) {
  let db_response = prisma.project.findMany({
    where: {
      OR: [
        {
          id: returnNumIfNum(query)
        },
        {
          name: {
            contains: query
          }
        },
        {
          description: {
            contains: query
          }
        },
        {
          genres: {
            contains: query
          }
        }
      ]
    }
  })
  return db_response
}