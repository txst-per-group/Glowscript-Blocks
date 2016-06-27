## 3D objects

#### Sphere
- pos
- radius
- up
- axis
- color
- opacity
- make trail

#### Box
- pos
- size
- length
- width
- height
- color
- up
- make trail

#### Arrow
- pos
- color
- axis
- shaftwidth
- headwidth
- headlength
- make_trail

#### Cylinder
- pos
- axis
- radius
- length
- color
- up

#### Cone
- pos
- axis
- size
- color
- opacity
- shininess
- radius

#### Label
- pos
- text
- xoffset
- yoffset
- space
- height
- border
- font
- color
- background

#### Ring
- pos
- size
- axis
- color
- up 
- visible
- radius
- thickness

#### Extrustion?

#### Curve ?

#### Pyramid
- pos
- size
- color


## Other Objects

#### Vector
- created with vec()
- must be 3d
- element wise operations + and *
- doesn't work with +=, -=, *=, /=
- mag(A) = A.mag = |A|
- mag2(A) = A.mag2 = |A| * |A|
- norm(A) = A.norm = A / |A| a unit vector in the direction of A
- hat?
- dot(A, B) = A.dot(B) = A dot B the scalar dot product of between two vectors
- cross(A, B) = A.cross(B) the cross product between two vectors
- diff\_angle(A, B) = A.diff\_angle(B) The angle between two vectors in radians
- A.equals(B) is true if all elements of A equal B
- A.proj(B) = dot(A,norm(B))*norm(B), the vector projection of A along B
- A.comp(B) = dot(A,norm(B)), the scalar projection of A along B

#### Canvases
- Do we need controls to control Canvase?
- multiple scenes?
- camera positions
- Do we want people to be able to adjust scene width and height

